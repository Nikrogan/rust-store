using Domain.Entity;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Default
{
    [Route("api/v1/news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<BaseNews>>> Get()
        {
            var response = await _newsService.GetAllNews();
            return new BaseServerResponse<IEnumerable<BaseNews>>(response.Data, response.StatusCode);
        }

        [HttpGet("{id}")]
        public async Task<IBaseServerResponse<BaseNews>> Get(int id)
        {
            var response = await _newsService.GetNewsById(id);
            return new BaseServerResponse<BaseNews>(response.Data, response.StatusCode);
        }
    }
}
