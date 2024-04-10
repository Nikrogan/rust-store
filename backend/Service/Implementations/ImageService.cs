using DAL.Interfaces;
using DAL.Repositories;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations
{
    public class ImageService : IImageService
    {
        //private readonly IWebHostEnvironment _environment;

        //public ImageService(Web environment)
        //{
        //    _imageRepository = imageRepository;
        //}

        public async Task<IBaseResponse<string>> AddImage(byte[] imageBytes)
        {
            try
            {
                var id = Guid.NewGuid().ToString();
                string imagePath = Path.Combine("../images", id + ".png");
                await File.WriteAllBytesAsync(imagePath, imageBytes);

                return new BaseResponse<string>()
                {
                    StatusCode = StatusCode.OK,
                    Data = id
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<string>()
                {
                    Description = $"[AddImage] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteImage(string Id)
        {
            try
            {
                string imagePath = Path.Combine("../images", Id + ".png");
                if (!File.Exists(imagePath))
                {
                    return new BaseResponse<bool>()
                    {
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                File.Delete(imagePath);

                return new BaseResponse<bool>()
                {
                    StatusCode = StatusCode.OK,
                    Data = true
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteImage] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<byte[]>> EditElement(byte[] imageBytes, string id)
        {
            try
            {
                string imagePath = Path.Combine("../images", id + ".png");
                if (!File.Exists(imagePath))
                {
                    return new BaseResponse<byte[]>()
                    {
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                File.Delete(imagePath);
                await File.WriteAllBytesAsync(imagePath, imageBytes);

                return new BaseResponse<byte[]>()
                {
                    StatusCode = StatusCode.OK,
                    Data = imageBytes
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<byte[]>()
                {
                    Description = $"[EditElement] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<byte[]>> GetImage(string Id)
        {
            try
            {
                string imagePath = Path.Combine("../images", Id + ".png");
                if (!File.Exists(imagePath))
                {
                    return new BaseResponse<byte[]>()
                    {
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                var imageData = await File.ReadAllBytesAsync(imagePath);

                return new BaseResponse<byte[]>()
                {
                    StatusCode = StatusCode.OK,
                    Data = imageData
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<byte[]>()
                {
                    Description = $"[GetImage] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
