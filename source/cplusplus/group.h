#ifndef group_h
#define group_h

#include <vector>

class Individual;
class Limiter;

class Group {
public:
    /*
     
     */
    Group(std::vector<Limiter *> &limitersIn, Individual *leaderIn);
    
    /*
     Checks if individual can be added, and if so adds the individual.
     */
    bool addIndividual(Individual *ind, bool forceAdd);
    
    // swap something function?
    
    /*
     Returns the summed cost of each of its limiters
     */
    double getCost() const;


    /*
     Clear the list of members
     */
    void clearMembers();

    /*
     Returns the list of individuals
     */
    std::vector<Individual*>& getMembers();

    /*
     Returns the leader
     */
    Individual* getLeader(); 

    /*
     Returns the max capacity
     */
    size_t getSize();
    
private:
    Individual *leader;
    std::vector<Individual *> members;
    std::vector<Limiter *> limiters;
    size_t sizeLimit; //TODO: set sizelimit for group (Should I make this a limiter?)
};


#endif /* group_h */
