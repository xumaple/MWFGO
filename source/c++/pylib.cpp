#include <boost/python.hpp>
#include "GroupOrganizer.cpp"

using namespace boost::python;

BOOST_PYTHON_MODULE(pylib)
{
    class_< GroupOrganizer >("GroupOrganizer")
      .def("addLeader", &GroupOrganizer::addLeader)
      .def("addPerson", &GroupOrganizer::addPerson)
      .def("addTrait", &GroupOrganizer::addTrait)
      .def("runAlgorithm", &GroupOrganizer::runAlgorithm);
}
