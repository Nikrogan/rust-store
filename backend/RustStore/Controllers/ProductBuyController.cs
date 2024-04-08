using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;


namespace RustStore.Controllers
{
    [Route("api/v1/productbuy")]
    [ApiController]
    [SessionAuthorize]
    public class ProductBuyController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IProductService _productService;
        public ProductBuyController(IUserService userService, IProductService productService)
        {
            _userService = userService;
            _productService = productService;
        }

        [HttpPost("id{productid}")]
        public async Task<IBaseServerResponse<string>> BuyProduct(string productid)
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            var product = await _productService.GetProductById(productid);
            if (product.StatusCode != Domain.Enum.StatusCode.OK
            || (!product.Data.IsActive))
                return new BaseServerResponse<string>("ProductNotFound", Domain.Enum.StatusCode.ElementNotFound);

            var finalPrice = CalculateFinalPrice(product.Data.Price, user.PersonalDiscount, product.Data.Discount);

            if (user.Balance < finalPrice)
                return new BaseServerResponse<string>("NotEnoughMoney", Domain.Enum.StatusCode.NotEnoughMoney);

            user.Balance -= finalPrice;
            user.Basket.Add(product.Data);

            await _userService.EditElement(user);
            await _userService.CreateUserBalanceAction(user.SteamId, new BalanceActionModel
                {
                    DateTime = DateTime.Now,
                    PaymentSystem = "-",
                    OperationType = OperationType.Purchase
                });

            return new BaseServerResponse<string>("Success", Domain.Enum.StatusCode.OK);
        }

        [HttpPost("{rouletteid}")]
        public async Task<IBaseServerResponse<ProductView>> BuyRouletteProduct(string productid)
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.InternalServerError);

            var product = await _productService.GetProductById(productid);
            if (product.StatusCode != Domain.Enum.StatusCode.OK
            || (!product.Data.IsActive) || (product.Data.ProductType != ProductType.Roullete)
            || product.Data.SimpleProducts == null)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.ElementNotFound);

            var finalPrice = CalculateFinalPrice(product.Data.Price, user.PersonalDiscount, product.Data.Discount);

            if (user.Balance < finalPrice)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.NotEnoughMoney);

            user.Balance -= finalPrice;

            int totalChance = 0;
            foreach (SimpleProduct simpleProd in product.Data.SimpleProducts)
                totalChance += simpleProd.Chance;

            int randomNumber = new Random().Next(1, totalChance + 1);

            SimpleProduct tempPrize = null;

            int cumulativeChance = 0;
            foreach (SimpleProduct simpleProd in product.Data.SimpleProducts)
            {
                cumulativeChance += simpleProd.Chance;
                if (randomNumber <= cumulativeChance)
                {
                    tempPrize = simpleProd;
                }
            }

            if (tempPrize == null)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.InternalServerError);

            var newBaseProduct = new BaseProduct()
            {
                ProductId = tempPrize.ProductId,
                Title = tempPrize.Title,
                Description = tempPrize.Description,
                GiveCommand = tempPrize.GiveCommand,
                ProductType = tempPrize.ProductType,
                ServerKey = product.Data.ServerKey,
                ImageUrl = tempPrize.ImageUrl,
                CategoryType = tempPrize.CategoryType,
                SimpleProducts = tempPrize.PackProducts
            };

            var newViewProduct = new ProductView(tempPrize);

            user.Basket.Add(newBaseProduct);

            await _userService.EditElement(user);
            await _userService.CreateUserBalanceAction(user.SteamId, new BalanceActionModel
            {
                DateTime = DateTime.Now,
                PaymentSystem = "-",
                OperationType = OperationType.Purchase
            });

            return new BaseServerResponse<ProductView>(newViewProduct, Domain.Enum.StatusCode.OK);

        }

        private static decimal CalculateFinalPrice(decimal productPrice, int userDiscountPercent, int productDiscountPercent)
        {
            // Переводим проценты в десятичные дроби
            decimal userDiscount = userDiscountPercent / 100m;
            decimal productDiscount = productDiscountPercent / 100m;

            // Вычисляем общий процент скидки
            decimal totalDiscount = userDiscount + productDiscount;

            // Вычисляем конечную цену товара
            decimal finalPrice = productPrice * (1 - totalDiscount);

            return finalPrice;
        }
    }
}
