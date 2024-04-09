using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using Service.Interfaces;
using System.Text;

namespace RustStore.Controllers
{
    [Route("api/v1/defaultitems")]
    [ApiController]
    public class DefaultItemsController : ControllerBase
    {
        private readonly IDefaultItemService _defaultItemService;
        private readonly IDistributedCache _cache;

        public DefaultItemsController(IDefaultItemService defaultItemService, IDistributedCache cache)
        {
            _defaultItemService = defaultItemService;
            _cache = cache;
        }

        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<DefaultItem>>> GetDefaultItems()
        {
            byte[] itemsData = await _cache.GetAsync("DefaultItemsCache");

            try
            {

                if (itemsData != null)
                {
                    try
                    {
                        string json = Encoding.UTF8.GetString(itemsData);
                        IEnumerable<DefaultItem> items = JsonConvert.DeserializeObject<IEnumerable<DefaultItem>>(json);
                        return new BaseServerResponse<IEnumerable<DefaultItem>>(items, Domain.Enum.StatusCode.OK);
                    }
                    catch
                    {
                        return new BaseServerResponse<IEnumerable<DefaultItem>>(null, Domain.Enum.StatusCode.InternalServerError);
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            var response = await _defaultItemService.GetDefaultItems();

            try
            {
                if (response.StatusCode == Domain.Enum.StatusCode.OK)
                {
                    string json = JsonConvert.SerializeObject(response.Data);
                    _ = Encoding.UTF8.GetBytes(json);
                    await _cache.SetAsync("DefaultItemsCache", itemsData, new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(4)
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return new BaseServerResponse<IEnumerable<DefaultItem>>(response.Data, response.StatusCode);
        }
    }
}
