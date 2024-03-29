﻿using Domain.Enum;
using DAL.Interfaces;
using Domain.Entity;
using Domain.Response;
using Service.Interfaces;
using MongoDB.Driver;
using Domain.SimpleEntity;

namespace Service.Implementations
{
    public class NewsService : INewsService
    {
        private readonly IBaseRepository<BaseNews> _newsRepository;

        public NewsService(IBaseRepository<BaseNews> newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<IBaseResponse<BaseNews>> CreateNews(SimpleNews viewModel)
        {
            try
            {
                var allElements = await _newsRepository.GetAll();
                int newId = 0;
                if (!allElements.Any())
                    newId = 0;
                else newId = (allElements.Last().NewsId + 1);

                var product = new BaseNews()
                {
                    NewsId = newId,
                    Title = viewModel.Title,
                    ImageUrl = viewModel.ImageUrl,
                    DateCreate = DateTime.Now,
                    Content = viewModel.Content
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
                var allResources = await _newsRepository.GetAll();
                var element = allResources.FirstOrDefault(x => x.NewsId == id);

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
                var allResources = await _newsRepository.GetAll();
                var product = allResources.FirstOrDefault(x => x.NewsId == viewModel.NewsId);
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
                var resource = await _newsRepository.GetAll();
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
                var allResources = await _newsRepository.GetAll();
                var resource = allResources.FirstOrDefault(x => x.NewsId == id);
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
