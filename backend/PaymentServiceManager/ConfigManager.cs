﻿using Domain.Entity;
using Domain.SimpleEntity;
using Newtonsoft.Json;

namespace PaymentServiceManager;

public static class ConfigManager
{
    private static readonly string configFilePath = "paymentServices.json";

    public static async Task<List<PaymentServiceModel>?> LoadConfig()
    {
        if (!File.Exists(configFilePath))
            // Если файл не существует, создаем новый с дефолтными данными
            CreateDefaultConfig();

        var json = await File.ReadAllTextAsync(configFilePath);
        var serverModels = JsonConvert.DeserializeObject<List<PaymentServiceModel>>(json);

        return serverModels;
    }

    public static async Task<List<SimplePaymentService>?> LoadSimpleConfig()
    {
        if (!File.Exists(configFilePath))
            // Если файл не существует, создаем новый с дефолтными данными
            CreateDefaultConfig();

        var json = await File.ReadAllTextAsync(configFilePath);
        var serverModels = JsonConvert.DeserializeObject<List<SimplePaymentService>>(json);

        return serverModels;
    }

    public static async Task<PaymentServiceModel?> GetPaymentConfig(string customKey)
    {
        var paymentConfig = await LoadConfig();
        if (paymentConfig == null)
            return null;

        var findedConfig = paymentConfig.FirstOrDefault(x => x.PaymentServiceKey == customKey);
        if (findedConfig == null)
            return null;

        return findedConfig;
    }

    private static async Task CreateDefaultConfig()
    {
        List<PaymentServiceModel> defaultConfig = new()
        {
            new PaymentServiceModel
            {
                DisplayName = "PayPal",
                PaymentServiceKey = "custom_paypal",
                ShopId = "123",
                SecretKey = "EEA8AXvbUiV1SKy4CRizbqkczV2nBWvBauLmYykQexUUB0fSdAFh01bww32q7Ok3mvLmdFNmL1oNjWZo",
                AdditionalKey = "AeJuTVNsJT0slsziV6jnzdL9jz0h8sSj4Q606sSnmpXx2FxIPzsHzx-vv4Yeg0DW8wjajCojF9O33obm",
                ImageUrl = "123"
            },
            new PaymentServiceModel
            {
                DisplayName = "Bank card MIR",
                PaymentServiceKey = "custom_tome",
                ShopId = "123",
                SecretKey = "EEA8AXvbUiV1SKy4CRizbqkczV2nBWvBauLmYykQexUUB0fSdAFh01bww32q7Ok3mvLmdFNmL1oNjWZo",
                AdditionalKey = "AeJuTVNsJT0slsziV6jnzdL9jz0h8sSj4Q606sSnmpXx2FxIPzsHzx-vv4Yeg0DW8wjajCojF9O33obm",
                ImageUrl = "123"
            }
        };

        var json = JsonConvert.SerializeObject(defaultConfig, Formatting.Indented);
        await File.WriteAllTextAsync(configFilePath, json);
    }
}