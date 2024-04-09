using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Newtonsoft.Json;
using Service.Interfaces;

namespace Service.Implementations
{
    public class DefaultItemService : IDefaultItemService
    {
        public async Task<IBaseResponse<IEnumerable<DefaultItem>>> GetDefaultItems()
        {
            try
            {
                List<DefaultItem> defaultItems = new();
                string[] jsonFiles = Directory.GetFiles("../defaultitems", "*.json");

                Console.WriteLine(jsonFiles.Count().ToString());

                foreach (string file in jsonFiles)
                {
                    using (FileStream stream = new(file, FileMode.Open, FileAccess.Read))
                    {
                        using (StreamReader reader = new(stream))
                        {
                            string jsonContent = await reader.ReadToEndAsync();
                            DefaultItem item = JsonConvert.DeserializeObject<DefaultItem>(jsonContent);
                            defaultItems.Add(item);
                        }
                    }
                }
                return new BaseResponse<IEnumerable<DefaultItem>>()
                {
                    StatusCode = StatusCode.OK,
                    Data = defaultItems
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<DefaultItem>>()
                {
                    Description = $"[UploadDefaultItems] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
