using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Service;
using Service.Interfaces;
namespace RustStore.Controllers.Default
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
        public async Task<IActionResult> Get(string id)
        {
            //byte[] imageData = await _cache.GetAsync(id);

            //if (imageData != null)
            //    return File(imageData, "image/png");

            var response = await _imageService.GetImage(id);

            if (response.StatusCode != Domain.Enum.StatusCode.OK)
                return BadRequest();

            //await _cache.SetAsync(id, response.Data, new DistributedCacheEntryOptions
            //{
            //    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
            //});

            return File(response.Data, "image/png");
        }
    }
}
