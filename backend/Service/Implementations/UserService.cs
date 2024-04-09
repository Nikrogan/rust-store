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
    public class UserService : IUserService
    {
        private readonly IBaseRepository<BaseUser> _accountRepository;
        private readonly ISteamApiService _steamApiService;

        public UserService(IBaseRepository<BaseUser> accountRepository, ISteamApiService steamApiService)
        {
            _accountRepository = accountRepository;
            _steamApiService = steamApiService;
        }

        public async Task<IBaseResponse<BaseUser>> CreateUser(BaseUser viewModel)
        {
            try
            {

                var User = new BaseUser()
                {
                    DisplayName = viewModel.DisplayName,
                    SteamId = viewModel.SteamId,
                    AvatarUrl = viewModel.AvatarUrl,
                    Balance = viewModel.Balance,
                    Role = Role.Default,
                    PersonalDiscount = viewModel.PersonalDiscount
                };

                await _accountRepository.Add(User);

                return new BaseResponse<BaseUser>()
                {
                    StatusCode = StatusCode.OK,
                    Data = User
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[CreateUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteUser(string id)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.Id == id);

                if (element == null)
                {
                    baseResponse.Description = "Resource not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _accountRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteUserBySteamId(string steamId)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.SteamId == steamId);

                if (element == null)
                {
                    baseResponse.Description = "Resource not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _accountRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> EditElement(BaseUser viewModel)
        {
            try
            {
                var allElements = await _accountRepository.GetAll();
                var user = allElements.FirstOrDefault(x => x.SteamId == viewModel.SteamId);
                if (user == null)
                {
                    return new BaseResponse<BaseUser>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                user.DisplayName = viewModel.DisplayName;
                user.AvatarUrl = viewModel.AvatarUrl;
                user.SessionId = viewModel.SessionId;
                user.LastAuth = viewModel.LastAuth;
                user.Balance = viewModel.Balance;
                user.Basket = viewModel.Basket;
                user.ActivatedPromo = viewModel.ActivatedPromo;
                user.BalanceActions = viewModel.BalanceActions;

                await _accountRepository.Update(user);

                return new BaseResponse<BaseUser>()
                {
                    Data = user,
                    StatusCode = StatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[EditAccount] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> EditElementFront(UserEditModel viewModel)
        {
            try
            {
                var allElements = await _accountRepository.GetAll();
                var user = allElements.FirstOrDefault(x => x.SteamId == viewModel.SteamId);
                if (user == null)
                {
                    return new BaseResponse<BaseUser>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                user.Balance = viewModel.Balance;
                user.PersonalDiscount = viewModel.PersonalDiscount;
                user.Role = viewModel.Role;

                await _accountRepository.Update(user);

                return new BaseResponse<BaseUser>()
                {
                    Data = user,
                    StatusCode = StatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[EditAccountFront] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<BaseUser>>> GetAllUsers()
        {
            var baseResponse = new BaseResponse<IEnumerable<BaseUser>>();
            try
            {
                var resource = await _accountRepository.GetAll();
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
                return new BaseResponse<IEnumerable<BaseUser>>()
                {
                    Description = $"[GetAllUsers] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserById(string id)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x=>x.Id == id);
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
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserByName(string name)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.DisplayName == name);
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
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserBySteamId(string steamId)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamId);
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
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserBySteamId] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserBySessionId(string sessionId)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SessionId == sessionId);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                if((resource.LastAuth - DateTime.Now).TotalHours >= 12)
                {
                    baseResponse.Description = "Session time out";
                    baseResponse.StatusCode = StatusCode.SessionTimeOut;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserBySteamId] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> LoginUser(string steamID)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                BaseUser user;
                var serviceResponse = await GetUserBySteamId(steamID);

                if (serviceResponse.StatusCode != StatusCode.OK && serviceResponse.StatusCode != StatusCode.ElementNotFound)
                {
                    baseResponse.Description = "Auth error";
                    baseResponse.StatusCode = StatusCode.InternalServerError;
                    return baseResponse;
                }

                user = serviceResponse.Data;
                if (serviceResponse.StatusCode == StatusCode.ElementNotFound)
                {

                    user = new BaseUser
                    {
                        SteamId = steamID,
                        Balance = 0,
                        Role = Role.Default
                    };

                    await CreateUser(user);
                }

                JObject playerInfo = await _steamApiService.GetPlayerInfoAsync(steamID);
                var avatarUrl = _steamApiService.GetAvatarUrl(playerInfo);
                var displayName = _steamApiService.GetDisplayName(playerInfo);

                user.AvatarUrl = avatarUrl ?? "default_image";
                user.DisplayName = displayName ?? "default_user";

                await EditElement(user);

                baseResponse.Data = user;
                baseResponse.StatusCode = StatusCode.OK;

                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[LoginUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<List<UserActivatedPromo>>> GetUserActivatedPromo(string steamID)
        {
            var baseResponse = new BaseResponse<List<UserActivatedPromo>> ();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamID);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource.ActivatedPromo ?? new List<UserActivatedPromo>();
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<List<UserActivatedPromo>>()
                {
                    Description = $"[GetUserActivatedPromo] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<List<UserActivatedPromo>>> CreateUserActivatedPromo(string steamID,BasePromo promocode)
        {
            var baseResponse = new BaseResponse<List<UserActivatedPromo>>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamID);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                var newActivatedPromo = new UserActivatedPromo
                {
                    DateActivate = DateTime.Now,
                    DiscountValue = promocode.DiscountValue,
                    MoneyValue = promocode.MoneyValue,
                    PromoCode = promocode.PromoCode
                };

                resource.ActivatedPromo.Add(newActivatedPromo);
                await EditElement(resource);

                baseResponse.Data = resource.ActivatedPromo ?? new List<UserActivatedPromo>();
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<List<UserActivatedPromo>>()
                {
                    Description = $"[CreateUserActivatedPromo] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<List<BalanceActionModel>>> GetUserBalanceAction(string steamID)
        {
            var baseResponse = new BaseResponse<List<BalanceActionModel>>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamID);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource.BalanceActions ?? new List<BalanceActionModel>();
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<List<BalanceActionModel>>()
                {
                    Description = $"[GetUserBalanceAction] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<List<BalanceActionModel>>> CreateUserBalanceAction(string steamID, BalanceActionModel model)
        {
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamID);
                if (resource == null) return new BaseResponse<List<BalanceActionModel>>()
                {
                    Description = "Account not found",
                    StatusCode = StatusCode.ElementNotFound
                };

                var newAction = new BalanceActionModel()
                {
                    DateTime = DateTime.Now,
                    OperationType = model.OperationType,
                    PaymentSystem = model.PaymentSystem

                };

                resource.BalanceActions.Add(newAction);

                await _accountRepository.Update(resource);

                return new BaseResponse<List<BalanceActionModel>>()
                {
                    StatusCode = StatusCode.OK,
                    Data = resource.BalanceActions
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<List<BalanceActionModel>>()
                {
                    Description = $"[CreateUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<List<BaseProduct>>> GetUserBasket(string steamID)
        {
            var baseResponse = new BaseResponse<List<BaseProduct>>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamID);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource.Basket ?? new List<BaseProduct>();
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<List<BaseProduct>>()
                {
                    Description = $"[GetUserBasket] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
