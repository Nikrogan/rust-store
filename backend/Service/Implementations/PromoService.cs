using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations;

public class PromoService : IPromoService
{
    private readonly IBaseRepository<BasePromo> _promoRepository;

    public PromoService(IBaseRepository<BasePromo> promoRepository)
    {
        _promoRepository = promoRepository;
    }

    public async Task<IBaseResponse<BasePromo>> CreatePromo(BasePromo viewModel)
    {
        try
        {
            var promo = new BasePromo
            {
                PromoCode = viewModel.PromoCode,
                MaxUses = viewModel.MaxUses,
                AlreadyUses = viewModel.AlreadyUses,
                CreateTime = DateTime.Now,
                EndTime = viewModel.EndTime,
                MoneyValue = viewModel.MoneyValue,
                DiscountValue = viewModel.DiscountValue,
                IsActive = viewModel.IsActive
            };

            await _promoRepository.Add(promo);

            return new BaseResponse<BasePromo>
            {
                StatusCode = StatusCode.OK,
                Data = promo
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<BasePromo>
            {
                Description = $"[CreatePromo] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<bool>> DeletePromoById(string id)
    {
        var baseResponse = new BaseResponse<bool>();
        try
        {
            var allElements = await _promoRepository.GetAll();
            var element = allElements.FirstOrDefault(x => x.Id == id);

            if (element == null)
            {
                baseResponse.Description = "Promo not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            await _promoRepository.Delete(element);

            baseResponse.Data = true;
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<bool>
            {
                Description = $"[DeletePromo] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<BasePromo>> EditElement(BasePromo viewModel)
    {
        try
        {
            var allProducts = await _promoRepository.GetAll();
            var promo = allProducts.FirstOrDefault(x => x.Id == viewModel.Id);
            if (promo == null)
                return new BaseResponse<BasePromo>
                {
                    Description = "Promo not found",
                    StatusCode = StatusCode.ElementNotFound
                };

            promo.PromoCode = viewModel.PromoCode;
            promo.MaxUses = viewModel.MaxUses;
            promo.AlreadyUses = viewModel.AlreadyUses;
            promo.EndTime = viewModel.EndTime;
            promo.MoneyValue = viewModel.MoneyValue;
            promo.DiscountValue = viewModel.DiscountValue;
            promo.IsActive = viewModel.IsActive;

            await _promoRepository.Update(promo);

            return new BaseResponse<BasePromo>
            {
                Data = promo,
                StatusCode = StatusCode.OK
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<BasePromo>
            {
                Description = $"[EditPromo] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<IEnumerable<BasePromo>>> GetAllPromo()
    {
        var baseResponse = new BaseResponse<IEnumerable<BasePromo>>();
        try
        {
            var resource = await _promoRepository.GetAll();
            if (!resource.Any())
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
            return new BaseResponse<IEnumerable<BasePromo>>
            {
                Description = $"[GetAllPromo] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<BasePromo>> GetPromoById(string id)
    {
        var baseResponse = new BaseResponse<BasePromo>();
        try
        {
            var allResources = await _promoRepository.GetAll();
            var resource = allResources.FirstOrDefault(x => x.Id == id);
            if (resource == null)
            {
                baseResponse.Description = "Promo not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            baseResponse.Data = resource;
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<BasePromo>
            {
                Description = $"[GetPromoById] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<BasePromo>> GetPromoByString(string promoCode)
    {
        var baseResponse = new BaseResponse<BasePromo>();
        try
        {
            var allResources = await _promoRepository.GetAll();
            var resource = allResources.FirstOrDefault(x => x.PromoCode == promoCode);
            if (resource == null)
            {
                baseResponse.Description = "Promo not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            baseResponse.Data = resource;
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<BasePromo>
            {
                Description = $"[GetPromoByString] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }
}