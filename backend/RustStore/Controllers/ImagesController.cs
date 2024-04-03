using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        public async Task<string> Post(IFormFile value)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                await value.CopyToAsync(memoryStream);

                var response = await _imageService.AddImage(memoryStream.ToArray(),value.FileName);

                if (response.StatusCode == Domain.Enum.StatusCode.OK)
                    return response.Data;
                return "";
            }
        }
    }
}
