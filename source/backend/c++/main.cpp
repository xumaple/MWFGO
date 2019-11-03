#include <string>
#include <iostream>
#include "group.h"
#include "individual.h"
#include "timeConstraint.h"
#include "constraintManager.h"
#include "weightLimiter.h"
#include <boost/python.hpp>

char const* greet();

int main() {
    std::cout << greet() << "Yay\n";
}

char const* greet()
{
    return "Hello world!\n";
}


BOOST_PYTHON_MODULE(algorithm)
{
    using namespace boost::python;
    def("greet", greet);
//    def("printGreeting", main);
}
