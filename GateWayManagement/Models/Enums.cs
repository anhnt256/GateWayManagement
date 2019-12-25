using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GateWayManagement.Models
{
    public enum ResponseCode
    {
        ServerError = -1,
        Success = 0,
        RequiredLogin = 1,
        ParamsInvalid = 2,
        ExistedUsername = 3,
        ExistedEmail = 4,
        AccountInActive = 5,
    }

    public enum TopUpType
    {
        Wallet = 1,
        Money = 2,
    }

    public enum MessageType {
        Wallet = 1,
        Money = 2,
        Food = 3,
        Chat = 4,
    }

    public enum OrderStatus {
        All = -1, // Tất cả
        Cancel = 1, // Hủy đơn hàng
        Received = 2, // Mới nhận đơn
        Processing = 3, // Đơn hàng đang được xử lý
        Finished = 4, // Hoàn tất đơn hàng
    }

    public enum PaymentType { 
        GuestFee = 1, // Khách tại quầy
        OrderFee = 2, // Phí dịch vụ
        TimeFee = 4, // Thời gian phí
        TransferFee = 8, // Chuyển tiền
        PromotionFee = 16, // Tặng tiền từ chính sách khuyến mãi
        GiftFee = 11, // Admin tặng tiền
    }
}
