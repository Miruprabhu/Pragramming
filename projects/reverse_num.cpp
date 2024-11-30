
#include <iostream>

int main()
{
    int num;
    int set = 0;
    int d;
    
    std::cout<<"Enter any number : ";
    std::cin >> num;

    while(num != 0)
    {
        d= num%10;
        set = (set*10)+d;
        num = num/10;
    }
    std::cout << "The reverse of the number is : "<<set;

    return 0;
}