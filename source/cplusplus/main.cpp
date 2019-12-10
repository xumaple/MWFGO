#include <string>
#include <iostream>
#include "GroupOrganizer.h"
#include <boost/python.hpp>

using namespace boost::python;

BOOST_PYTHON_MODULE(algorithm)
{
    class_< GroupOrganizer >("GroupOrganizer")
      .def("addLeader", &GroupOrganizer::addLeader)
      .def("addPerson", &GroupOrganizer::addPerson)
      .def("addTrait", &GroupOrganizer::addTrait)
      .def("runAlgorithm", &GroupOrganizer::runAlgorithm)
      .def("printDebug", &GroupOrganizer::printDebug)
      .def("printGroups", &GroupOrganizer::printGroups);
}
