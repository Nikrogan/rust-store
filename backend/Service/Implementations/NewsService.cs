using System.Security.Claims;
using Domain.Enum;
using DAL.Interfaces;
using Domain.Entity;
using Domain.Response;
using Service.Interfaces;
using MongoDB.Driver;
using RustStats.Service.Interfaces;
using Newtonsoft.Json.Linq;

namespace Service.Implementations
{
    public class NewsService : INewsService
    {
        private readonly IBaseRepository<BaseNews> _newsRepository;

        public NewsService(IBaseRepository<BaseNews> newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<IBaseResponse<BaseNews>> CreateNews(BaseNews viewModel)
        {
            try
            {
                var product = new BaseNews()
                {
                    NewsId = viewModel.NewsId
                };

                await _newsRepository.Add(product);

                return new BaseResponse<BaseNews>()
                {
                    StatusCode = StatusCode.OK,
                    Data = product
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseNews>()
                {
                    Description = $"[CreateNews] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteNewsById(int id)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var element = _newsRepository.GetAll().FirstOrDefault(x => x.NewsId == id);

                if (element == null)
                {
                    baseResponse.Description = "Resource not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _newsRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteNewsById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseNews>> EditElement(BaseNews viewModel)
        {
            try
            {
                var product = _newsRepository.GetAll().FirstOrDefault(x => x.NewsId == viewModel.NewsId);
                if (product == null)
                {
                    return new BaseResponse<BaseNews>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                // Изменение данных энтити продукта

                await _newsRepository.Update(product);

                return new BaseResponse<BaseNews>()
                {
                    Data = product,
                    StatusCode = StatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseNews>()
                {
                    Description = $"[EditAccount] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<BaseNews>>> GetAllNews()
        {
            var baseResponse = new BaseResponse<IEnumerable<BaseNews>>();
            try
            {
                var resource = _newsRepository.GetAll().ToList();
                if (resource == null)
                {
                    baseResponse.Description = "No one elements";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<BaseNews>>()
                {
                    Description = $"[GetAllNews] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseNews>> GetNewsById(int id)
        {
            var baseResponse = new BaseResponse<BaseNews>();
            try
            {
                var resource = _newsRepository.GetAll().FirstOrDefault(x => x.NewsId == id);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseNews>()
                {
                    Description = $"[GetNewsById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
