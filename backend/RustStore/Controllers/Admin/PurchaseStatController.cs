using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Admin
{
    [Route("api/v1/admin/purchasestat")]
    [ApiController]
    [SessionAuthorize(2)]
    public class PurchaseStatController : ControllerBase
    {
        private readonly IPurchaseStatService _statService;

        public PurchaseStatController(IPurchaseStatService statService)
        {
            _statService = statService;
        }

        [HttpGet]
        public async Task<IBaseServerResponse<Dictionary<string, ulong>>> GetStatForTimeNoSeparate(DateTime startTime, DateTime endTime, ulong[] serverKeys)
        {
            var response = await _statService.GetStat(startTime, endTime, serverKeys);
            return new BaseServerResponse<Dictionary<string, ulong>>(response.Data, response.StatusCode);
        }

        [HttpGet("separate")]
        public async Task<IBaseServerResponse<IEnumerable<PurchaseStat>>> GetStatForTimeSeparateDays(DateTime startTime, DateTime endTime, ulong[] serverKeys)
        {
            var response = await _statService.GetStatDays(startTime, endTime, serverKeys);
            return new BaseServerResponse<IEnumerable<PurchaseStat>>(response.Data, response.StatusCode);
        }

        [HttpGet("alltime")]
        public async Task<IBaseServerResponse<Dictionary<string, ulong>>> GetStatAllTime(ulong[] serverKeys)
        {
            var response = await _statService.GetAllTime(serverKeys);
            return new BaseServerResponse<Dictionary<string, ulong>>(response.Data, response.StatusCode);
        }
    }
}
