using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/userpromo")]
    public class UserPromoController : Controller
    {
        private readonly IUserService _userService;
        private readonly IPromoService _promoService;
        public UserPromoController(IUserService userService, IPromoService promoService)
        {
            _userService = userService;
            _promoService = promoService;
        }

        [HttpGet("{steamId}")]
        public async Task<IBaseServerResponse<IEnumerable<UserActivatedPromo>>> Get(string steamId)
        {
            var response = await _userService.GetUserActivatedPromo(steamId);
            return new BaseServerResponse<IEnumerable<UserActivatedPromo>>(response.Data, response.StatusCode);
        }

        [HttpPost("{promocode}")]
        public async Task<IBaseServerResponse<string>> ActivatePromo(string promocode)
        {
            if (Request.Cookies.TryGetValue("session", out var jwt))
            {
                var user = await _userService.GetUserBySessionId(jwt);
                if(user.StatusCode == Domain.Enum.StatusCode.OK)
                {
                    if(user.Data.ActivatedPromo.FirstOrDefault(x=>x.PromoCode == promocode) == null)
                    {
                        var promo = await _promoService.GetPromoByString(promocode);
                        if (promo.StatusCode != Domain.Enum.StatusCode.OK 
                        || (!promo.Data.IsActive) || promo.Data.MaxUses <= promo.Data.AlreadyUses
                        || DateTime.Now >= promo.Data.EndTime)
                            return new BaseServerResponse<string>("PromoNotFound", Domain.Enum.StatusCode.ElementNotFound);

                        if(promo.Data.MoneyValue != 0)
                        {
                            user.Data.Balance += promo.Data.MoneyValue;
                        }

                        if(promo.Data.DiscountValue != 0)
                        {
                            user.Data.PersonalDiscount += promo.Data.DiscountValue;
                        }
                        promo.Data.AlreadyUses++;

                        await _promoService.EditElement(promo.Data);
                        await _userService.EditElement(user.Data);

                        await _userService.CreateUserActivatedPromo(user.Data.SteamId, promo.Data);

                        await _userService.CreateUserBalanceAction(user.Data.SteamId, new BalanceActionModel
                        {
                            DateTime = DateTime.Now,
                            PaymentSystem = "-",
                            OperationType = OperationType.UsePromocode
                        });

                        return new BaseServerResponse<string>("Success", Domain.Enum.StatusCode.OK);
                    }
                }
            }
            return new BaseServerResponse<string>("Error", Domain.Enum.StatusCode.InternalServerError);
        }
    }
}
