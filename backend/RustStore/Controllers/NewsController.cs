using Domain.Entity;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers
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

        [HttpPost]
        [SessionAuthorize(1)]
        public async Task<IBaseServerResponse<BaseNews>> Create(SimpleNews newsModel)
        {
            var response = await _newsService.CreateNews(newsModel);
            return new BaseServerResponse<BaseNews>(response.Data, response.StatusCode);
        }

        [HttpGet("{id}")]
        public async Task<IBaseServerResponse<BaseNews>> Get(int id)
        {
            var response = await _newsService.GetNewsById(id);
            return new BaseServerResponse<BaseNews>(response.Data, response.StatusCode);
        }

        [HttpPut]
        [SessionAuthorize(1)]
        public async Task<IBaseServerResponse<BaseNews>> Update(BaseNews newsModel)
        {
            var response = await _newsService.EditElement(newsModel);
            return new BaseServerResponse<BaseNews>(response.Data, response.StatusCode);
        }

        [HttpDelete("{id}")]
        [SessionAuthorize(1)]
        public async Task<IBaseServerResponse<BaseNews>> Delete(int id)
        {
            var response = await _newsService.DeleteNewsById(id);
            return new BaseServerResponse<BaseNews>(null, response.StatusCode);
        }
    }
}
