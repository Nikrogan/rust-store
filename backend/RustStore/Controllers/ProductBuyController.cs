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

        [HttpPost("{productid}")]
        public async Task<IBaseServerResponse<ProductView>> BuyProduct(string productid)
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.InternalServerError);

            var product = await _productService.GetProductById(productid);
            if (product.StatusCode != Domain.Enum.StatusCode.OK
            || (!product.Data.IsActive))
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.ElementNotFound);

            if((product.Data.ProductType == ProductType.Roullete || product.Data.ProductType == ProductType.Pack)
                && product.Data.SimpleProducts == null)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.ElementIsEmpty);

            var finalPrice = CalculateFinalPrice(product.Data.Price, user.PersonalDiscount, product.Data.Discount);

            if (user.Balance < finalPrice)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.NotEnoughMoney);

            user.Balance -= finalPrice;

            ProductView productView = new(product.Data);
            BaseProduct givedProduct = product.Data;

            if (product.Data.ProductType == ProductType.Roullete)
            {
                var tempPrize = GetRandomPrize(product.Data.SimpleProducts);

                var newBaseProduct = new BaseProduct()
                {
                    ItemID = tempPrize.ItemID,
                    Title = tempPrize.Title,
                    Description = tempPrize.Description,
                    GiveCommand = tempPrize.GiveCommand,
                    ProductType = tempPrize.ProductType,
                    ServerKey = product.Data.ServerKey,
                    ImageUrl = tempPrize.ImageUrl,
                    CategoryType = tempPrize.CategoryType,
                    SimpleProducts = tempPrize.PackProducts
                };

                givedProduct = newBaseProduct;
                productView = new(newBaseProduct);
            }

            user.Basket.Add(givedProduct);

            await _userService.EditElement(user);
            await _userService.CreateUserBalanceAction(user.SteamId, new BalanceActionModel
            {
                DateTime = DateTime.Now,
                PaymentSystem = "-",
                OperationType = OperationType.Purchase
            });

            return new BaseServerResponse<ProductView>(productView, Domain.Enum.StatusCode.OK);
        }

        private static SimpleProduct GetRandomPrize(IEnumerable<SimpleProduct> simpleProducts)
        {
            int totalChance = simpleProducts.Sum(s => s.Chance);
            int randomNumber = new Random().Next(1, totalChance + 1);

            int cumulativeChance = 0;
            foreach (var simpleProduct in simpleProducts)
            {
                cumulativeChance += simpleProduct.Chance;
                if (randomNumber <= cumulativeChance)
                    return simpleProduct;
            }

            return simpleProducts.First(); // Fallback
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
