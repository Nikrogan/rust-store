using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using Service.Implementations;
using Service.Interfaces;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RustStore.Controllers
{
    [Route("api/v1/productbuy")]
    [ApiController]
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
            if (!Request.Cookies.TryGetValue("session", out var jwt))
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            if(string.IsNullOrEmpty(jwt))
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            var user = await _userService.GetUserBySessionId(jwt);
            if(user.StatusCode != Domain.Enum.StatusCode.OK)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);
            
            var product = await _productService.GetProductById(productid);
            if (product.StatusCode != Domain.Enum.StatusCode.OK
            || (!product.Data.IsActive))
                return new BaseServerResponse<string>("ProductNotFound", Domain.Enum.StatusCode.ElementNotFound);

            var finalPrice = CalculateFinalPrice(product.Data.Price, user.Data.PersonalDiscount, product.Data.Discount);

            if (user.Data.Balance < finalPrice)
                return new BaseServerResponse<string>("NotEnoughMoney", Domain.Enum.StatusCode.NotEnoughMoney);

            user.Data.Balance -= finalPrice;
            user.Data.Basket.Add(product.Data);

            await _userService.EditElement(user.Data);
            await _userService.CreateUserBalanceAction(user.Data.SteamId, new BalanceActionModel
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
            if (!Request.Cookies.TryGetValue("session", out var jwt))
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.AccessDenied);

            if (string.IsNullOrEmpty(jwt))
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.AccessDenied);

            var user = await _userService.GetUserBySessionId(jwt);
            if (user.StatusCode != Domain.Enum.StatusCode.OK)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.AccessDenied);

            var product = await _productService.GetProductById(productid);
            if (product.StatusCode != Domain.Enum.StatusCode.OK
            || (!product.Data.IsActive) || (product.Data.ProductType != ProductType.Roullete)
            || product.Data.SimpleProducts == null)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.ElementNotFound);

            var finalPrice = CalculateFinalPrice(product.Data.Price, user.Data.PersonalDiscount, product.Data.Discount);

            if (user.Data.Balance < finalPrice)
                return new BaseServerResponse<ProductView>(null, Domain.Enum.StatusCode.NotEnoughMoney);

            user.Data.Balance -= finalPrice;

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

            user.Data.Basket.Add(newBaseProduct);

            await _userService.EditElement(user.Data);
            await _userService.CreateUserBalanceAction(user.Data.SteamId, new BalanceActionModel
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
