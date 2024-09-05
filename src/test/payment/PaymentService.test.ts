import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });



 
  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails: PaymentDetails = {
      amount: 50,
      currency: 'USD',
      method: PaymentMethod.BankTransfer,
      cardNumber: '1234',
    };
    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    const mockProcessPaymentResponse = {
      status: 'success',
      transactionId: 'txn_1234567890',
    };

    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);

    // Act
    const result = paymentService.makePayment(paymentDetails);

    // Assert
    // Check the returned result is equal to the success message returned 
    //by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(result).toEqual(`Payment successful. Transaction ID: ${mockProcessPaymentResponse.transactionId}`);
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(paymentDetails);
  });







  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails: PaymentDetails = { amount: 50, currency: 'TND', method: PaymentMethod.BankTransfer, cardNumber: '1234' };
    //TODO: Create mockProcessPaymentResponse object containing failure status
    const mockProcessPaymentResponse: Object = { status: 'failure', transactionId: 'txn_123456789054869876' };
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((paymentDetails:PaymentDetails) => mockProcessPaymentResponse)

    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const paymentDetails: PaymentDetails = { amount: -50, currency: 'TND', method: PaymentMethod.BankTransfer, cardNumber: '1234' };
    const mockProcessPaymentResponse: Object = { status: 'failure', transactionId: 'txn_123456789054869876' };
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});
