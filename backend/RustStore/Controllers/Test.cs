using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RustStore.Controllers
{
    [Route("api/v1/test")]
    [ApiController]
    public class Test : Controller
    {
        
        [HttpGet]
        public ActionResult Get()
        {
            Console.WriteLine("PRISHLO");
            return View();
        }

        [HttpPost]
        public ActionResult Post()
        {
            Console.WriteLine("PRISHLO POST");
            return View();
        }

    }
}
