using Domain.Entity;
using Domain.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IPaymentService
    {
        Task<IBaseResponse<IEnumerable<BasePayment>>> GetAllPayments();
        Task<IBaseResponse<BasePayment>> CreatePayment(BasePayment newModel);
        Task<IBaseResponse<BasePayment>> EditElement(BasePayment paymentModel);
        Task<IBaseResponse<BasePayment>> GetPaymentById(string Id);
        Task<IBaseResponse<BasePayment>> GetPaymentByServiceId(string Id);
        Task<IBaseResponse<bool>> DeletePaymentById(string Id);
    }
}
