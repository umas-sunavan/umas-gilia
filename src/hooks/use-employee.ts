import { Employee } from 'src/types/employee';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useEmployee() {
  const employee: Employee = {
    id: 'w8x9y1z2-a3b4-5c6d-7e8f-9g0h1i2j3k4l',
    displayName: '顏鈞諺',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: '/assets/images/avatar/avatar_13.jpg',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about:
      '我是你的客服工讀生，我能為您24小時即時回覆客戶的訊息，盡可能讓客人留下來，等到你回來時轉交給您！',
    role: 'admin',
    isPublic: true,
  };

  return { employee };
}
