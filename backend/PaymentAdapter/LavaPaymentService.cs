using Domain.Entity;
using Domain.PaymentServicesModels;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net.Http;
using System.Net.Sockets;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace PaymentAdapter
{
    public class LavaPaymentService : IPayment
    {
        public string? ProcessPayment(PaymentCreateModel paymentCreateModel)
        {
            // Логика для обработки оплаты через PayPal
            Console.WriteLine($"Оплата через Lava на сумму {paymentCreateModel.Amount}");

            var serviceModel = paymentCreateModel.PaymentServiceModel;
            if (serviceModel == null) return null;

            LavaModel invoiceCreateModel = new LavaModel() { 
            Sum = float.Parse(paymentCreateModel.Amount.ToString()),
            OrderId = paymentCreateModel.OrderId.ToString(),
            };

            //var serializeData = "";
            //UTF8Encoding encoding = new UTF8Encoding();
            //byte[] data = encoding.GetBytes(serializeData);
            //byte[] key = encoding.GetBytes(paymentCreateModel.PaymentServiceModel.SecretKey);
            //var hash = new HMACSHA256(key);
            //var hashmessage = hash.ComputeHash(data);

            //string signature = "";

            //for (int i = 0; i < bytes.Length; i++)
            //{
            //    sbinary += bytes[i].ToString("X2").ToLower();
            //}
            //var request = new HttpRequestMessage(HttpMethod.Post, "https://api.lava.ru/business/");

            //request.Headers.Add(“Accept”,”application / json”);
            //request.Headers.Add(“Content - Type”,”application / json”);
            //request.Headers.Add(“Signature”, signature);

            //request.Content = new StringContent(serializeData, Encoding.UTF8);

            //var response = await httpClient.SendAsync(request);

            //if (!response.IsSuccessStatusCode)
            //{

            //    string str = await response.Content.ReadAsStringAsync();

            //    throw new Exception("Response is " + str + "\r\n" + "Code is " + response.StatusCode);
            //}

            //string response = response.Content.ReadAsStringAsync().Result;


            return "invoice";
        }
    }
}
