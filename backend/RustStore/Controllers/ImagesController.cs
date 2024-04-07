using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
namespace RustStore.Controllers
{
    [Route("api/v1/storage")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        public ImagesController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var response = await _imageService.GetImage(id);

            if (response.StatusCode != Domain.Enum.StatusCode.OK)
                return BadRequest();

            return File(response.Data, "image/png");
        }

        [HttpPost]
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
        public async Task<IBaseServerResponse<string>> Put(IFormFile value, string id)
        {
            if (value.ContentType != "image/png")
                return new BaseServerResponse<string>("Only PNG files", Domain.Enum.StatusCode.InternalServerError);

            using (MemoryStream memoryStream = new MemoryStream())
            {
                await value.CopyToAsync(memoryStream);

                var response = await _imageService.EditElement(memoryStream.ToArray(),id);

                return new BaseServerResponse<string>(response.Data, response.StatusCode);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IBaseServerResponse<bool>> Delete(string id)
        {
            var response = await _imageService.DeleteImage(id);
            return new BaseServerResponse<bool>(response.Data, response.StatusCode);
        }
    }
}
