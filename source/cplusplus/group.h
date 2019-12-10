#ifndef group_h
#define group_h

#include <vector>

class Individual;
class Limiter;

class Group {
public:
    /*
     Constructor
     */
    Group(std::vector<Limiter *> &limitersIn, Individual *leaderIn);

    /*
     Destructor
     */
    ~Group();
    
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
    
private:
    Individual *leader;
    std::vector<Individual *> members;
    std::vector<Limiter *> limiters;
};


#endif /* group_h */
