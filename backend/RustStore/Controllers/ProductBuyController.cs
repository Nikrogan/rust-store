using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Implementations;
using Service.Interfaces;

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

        [HttpPost("{productid}")]
        public async Task<IBaseServerResponse<string>> ActivatePromo(string productid)
        {
            if (Request.Cookies.TryGetValue("session", out var jwt))
            {
                var user = await _userService.GetUserBySessionId(jwt);
                if (user.StatusCode == Domain.Enum.StatusCode.OK)
                {
                    var product = await _productService.GetProductById(productid);
                    if (product.StatusCode != Domain.Enum.StatusCode.OK
                    || (!product.Data.IsActive))
                        return new BaseServerResponse<string>("ProductNotFound", Domain.Enum.StatusCode.ElementNotFound);

                    if(user.Data.Balance < product.Data.Price)
                        return new BaseServerResponse<string>("NotEnoughMoney", Domain.Enum.StatusCode.NotEnoughMoney);

                    user.Data.Balance -= product.Data.Price;
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
            }
            return new BaseServerResponse<string>("Error", Domain.Enum.StatusCode.InternalServerError);
        }
    }
}
