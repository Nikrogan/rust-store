using Domain.Enum;
using MongoDB.Bson;
using System.Text.Json;

namespace Domain.Response
{
    public class BaseServerResponse<T> : IBaseServerResponse<T>
    {
        public BaseServerResponse(T? inputModel, StatusCode statusCode) 
        {
            payLoad = inputModel;
            status = statusCode;
        }

        public StatusCode status { get; set; }

        public T? payLoad { get; set; }
    }

    public interface IBaseServerResponse<T>
    {
        StatusCode status { get; }
        T? payLoad { get; }
    }
}
