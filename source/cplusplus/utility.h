#ifndef utility_h
#define utility_h

#include <exception>
#include <iostream>

// a simple class for error exceptions that inherits from std::exception
class Error : public std::exception {
public:
    Error(const char* msg_) : msg(msg_) {}
    const char* what() const noexcept override
    {return msg;}
private:
    const char* msg;
};

#endif /* utility_h */
