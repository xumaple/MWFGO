#include <boost/python.hpp>
#include "GroupOrganizer.h"

using namespace boost::python;

BOOST_PYTHON_MODULE(pylib)
{
    class_< GroupOrganizer >("PythonGroupOrganizer")
      .def("addLeader", &GroupOrganizer::addLeader)
      .def("addPerson", &GroupOrganizer::addPerson)
      .def("addTrait", &GroupOrganizer::addTrait)
      .def("runAlgorithm", &GroupOrganizer::runAlgorithm);
}
