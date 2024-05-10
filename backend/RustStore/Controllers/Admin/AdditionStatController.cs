using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Admin
{
    [Route("api/v1/admin/additionstat")]
    [ApiController]
    [SessionAuthorize(2)]
    public class AdditionStatController : ControllerBase
    {
        private readonly IAdditionStatService _statService;

        public AdditionStatController(IAdditionStatService statService)
        {
            _statService = statService;
        }

        [HttpGet]
        public async Task<IBaseServerResponse<Dictionary<DateTime,decimal>>> GetStatForTime(DateTime startTime, DateTime endTime)
        {
            var response = await _statService.GetStat(startTime,endTime);
            return new BaseServerResponse<Dictionary<DateTime, decimal>>(response.Data, response.StatusCode);
        }

        [HttpGet("alltime")]
        public async Task<IBaseServerResponse<decimal>> GetStatAllTime()
        {
            var response = await _statService.GetAllTime();
            return new BaseServerResponse<decimal>(response.Data, response.StatusCode);
        }
    }
}
