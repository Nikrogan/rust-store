using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Admin
{
    [Route("api/v1/admin/promo")]
    [ApiController]
    [SessionAuthorize(2)]
    public class PromoController : ControllerBase
    {
        private readonly IPromoService _promoService;
        public PromoController(IPromoService promoService)
        {
            _promoService = promoService;
        }


        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<BasePromo>>> Get()
        {
            var response = await _promoService.GetAllPromo();
            return new BaseServerResponse<IEnumerable<BasePromo>>(response.Data, response.StatusCode);
        }

        [HttpPost]
        public async Task<IBaseServerResponse<BasePromo>> Create(BasePromo promoModel)
        {
            var response = await _promoService.CreatePromo(promoModel);
            return new BaseServerResponse<BasePromo>(response.Data, response.StatusCode);
        }



        [HttpGet("id{id}")]
        public async Task<IBaseServerResponse<BasePromo>> Get(string id)
        {
            var response = await _promoService.GetPromoById(id);
            return new BaseServerResponse<BasePromo>(response.Data, response.StatusCode);
        }

        [HttpGet("{promoCode}")]
        public async Task<IBaseServerResponse<BasePromo>> GetString(string promoCode)
        {
            var response = await _promoService.GetPromoByString(promoCode);
            return new BaseServerResponse<BasePromo>(response.Data, response.StatusCode);
        }

        [HttpPut]
        public async Task<IBaseServerResponse<BasePromo>> Update(BasePromo promoModel)
        {
            var response = await _promoService.EditElement(promoModel);
            return new BaseServerResponse<BasePromo>(response.Data, response.StatusCode);
        }

        [HttpDelete("{id}")]
        public async Task<IBaseServerResponse<BaseProduct>> Delete(string id)
        {
            var response = await _promoService.DeletePromoById(id);
            return new BaseServerResponse<BaseProduct>(null, response.StatusCode);
        }
    }
}
