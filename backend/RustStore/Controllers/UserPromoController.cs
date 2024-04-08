using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
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
        [SessionAuthorize(2)]
        public async Task<IBaseServerResponse<IEnumerable<UserActivatedPromo>>> Get(string steamId)
        {
            var response = await _userService.GetUserActivatedPromo(steamId);
            return new BaseServerResponse<IEnumerable<UserActivatedPromo>>(response.Data, response.StatusCode);
        }

        [HttpGet]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<IEnumerable<UserActivatedPromo>>> Get()
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<IEnumerable<UserActivatedPromo>>(null, Domain.Enum.StatusCode.InternalServerError);

            var response = await _userService.GetUserActivatedPromo(user.SteamId);
            return new BaseServerResponse<IEnumerable<UserActivatedPromo>>(response.Data, response.StatusCode);
        }

        [HttpPost("{promocode}")]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<string>> ActivatePromo(string promocode)
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            if (user.ActivatedPromo.FirstOrDefault(x => x.PromoCode == promocode) != null)
                return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.PromoAlreadyUsed);

            var promo = await _promoService.GetPromoByString(promocode);
            if (promo.StatusCode != Domain.Enum.StatusCode.OK 
            || (!promo.Data.IsActive) || promo.Data.MaxUses <= promo.Data.AlreadyUses
            || DateTime.Now >= promo.Data.EndTime)
                return new BaseServerResponse<string>("PromoNotFound", Domain.Enum.StatusCode.ElementNotFound);

            if(promo.Data.MoneyValue != 0)
                user.Balance += promo.Data.MoneyValue;

            if(promo.Data.DiscountValue != 0)
                user.PersonalDiscount += promo.Data.DiscountValue;
            
            promo.Data.AlreadyUses++;

            await _promoService.EditElement(promo.Data);
            await _userService.EditElement(user);

            await _userService.CreateUserActivatedPromo(user.SteamId, promo.Data);
            await _userService.CreateUserBalanceAction(user.SteamId, new BalanceActionModel
            {
                DateTime = DateTime.Now,
                PaymentSystem = "-",
                OperationType = OperationType.UsePromocode
            });

            return new BaseServerResponse<string>("Success", Domain.Enum.StatusCode.OK);
        }
    }
}
