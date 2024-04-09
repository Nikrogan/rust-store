using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Service;
using Service.Interfaces;
using System.Net;
namespace RustStore.Controllers
{
    [Route("api/v1/storage")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IDistributedCache _cache;

        public ImagesController(IImageService imageService, IDistributedCache cache)
        {
            _imageService = imageService;
            _cache = cache;
        }

        [HttpGet("{id}")]
        [SessionAuthorize]
        public async Task<IActionResult> Get(string id)
        {
            byte[] imageData = await _cache.GetAsync(id);

            if (imageData != null)
                return File(imageData, "image/png");

            var response = await _imageService.GetImage(id);

            if (response.StatusCode != Domain.Enum.StatusCode.OK)
                return BadRequest();

            await _cache.SetAsync(id, response.Data, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
            });

            return File(response.Data, "image/png");
        }

        [HttpPost]
        [SessionAuthorize(2)]
        public async Task<IBaseServerResponse<string>> Post(IFormFile value)
        {
            if (value.ContentType != "image/png")
                return new BaseServerResponse<string>("Only PNG files", Domain.Enum.StatusCode.InternalServerError);

            using (MemoryStream memoryStream = new MemoryStream())
            {
                await value.CopyToAsync(memoryStream);

                var response = await _imageService.AddImage(memoryStream.ToArray());

                return new BaseServerResponse<string>(response.Data, response.StatusCode);
            }
        }

        [HttpPut("{id}")]
        [SessionAuthorize(2)]
        public async Task<IBaseServerResponse<byte[]>> Put(IFormFile value, string id)
        {
            if (value.ContentType != "image/png")
                return new BaseServerResponse<byte[]>(null, Domain.Enum.StatusCode.ElementIsEmpty);

            using (MemoryStream memoryStream = new MemoryStream())
            {
                await value.CopyToAsync(memoryStream);

                var response = await _imageService.EditElement(memoryStream.ToArray(),id);

                await _cache.SetAsync(id, response.Data, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
                });

                return new BaseServerResponse<byte[]>(response.Data, response.StatusCode);
            }
        }

        [HttpDelete("{id}")]
        [SessionAuthorize(2)]
        public async Task<IBaseServerResponse<bool>> Delete(string id)
        {
            var response = await _imageService.DeleteImage(id);
            return new BaseServerResponse<bool>(response.Data, response.StatusCode);
        }
    }
}
