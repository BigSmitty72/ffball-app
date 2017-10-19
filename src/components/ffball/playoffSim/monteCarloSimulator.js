import async from 'async';
import _ from 'lodash';

const totalPlayoffList = [];

const numberToPlace = function(number) {
    switch(number) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        case 4:
            return "fourth";
        case 5:
            return "fifth";
        case 6:
            return "sixth";
        case 7:
            return "seventh";
        case 8:
            return "eighth";
        case 9:
            return "ninth";
        case 10:
            return "tenth";
        case 11:
            return "eleventh";
        case 12:
            return "twelvth";
        default:
            return "NA";
    }
};

const simGame = function(teamOffset) {
    const rand = _.random(0, 100);
    if (rand < (teamOffset * 100)) {
        return true;
    } 
    return false;
};

function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}

function calculateWinCount(teams, matchup, callback) {
    let winnerTeamId;
    if (simGame(matchup.teamOffset)) {
        winnerTeamId = matchup.teamOne;
    } else {
        winnerTeamId = matchup.teamTwo;
    }

    async.each(teams, function(team, seriesCallback) {
        if (team.TeamId === winnerTeamId) {
            team.simWins += 1;
        }
        team.playoffScore = team.startPoints + team.simWins;
        seriesCallback(null, team);
    }, function(err){
        callback(null, teams);
    });
}

function iterateWeeks(teams, weeks, fnCallback) {
    async.each(weeks, function( week, seriesCallback) {
        iterateMatchups(teams, week.matchups, function (err, res) {
            seriesCallback(null, res);
        });
    }, function(err){
        fnCallback(null, teams);
    });
}

function iterateMatchups (teams, matchups, fnCallback) {
    async.each(matchups, function (matchup, seriesCallback) {
        calculateWinCount(teams, matchup, function (err, res) {
            seriesCallback(null, res);
        });
    }, function(err){
        fnCallback(null, teams);
    });    
}

function checkTeamIdExist(arr, teamId, mainCallback){
  async.some(arr, function(team, callback){
    if (team.TeamId === teamId) {
        callback(true);
    } else {
        callback(false);
    }
  }, function(result){
    mainCallback(result);
  });
}

function simWeeklyMatchups(teams, weeklyMatchups, playoffTeams, callback) {
    async.map(teams, resetSimWins, function (err, teamsRes) {
        iterateWeeks(teamsRes, weeklyMatchups, function (err, res) {
            const playoffTeamList = res.sort(function(a,b){
                return parseFloat(b.playoffScore) - parseFloat(a.playoffScore);
            });
            playoffTeamList.splice(playoffTeams);

            async.eachOfSeries(playoffTeamList, function(team, index, seriesCallback) {
                const finish = numberToPlace(index + 1);
                const playoffObj = {
                    TeamId: team.TeamId,
                    finishes: {}
                };
                playoffObj.finishes[finish] = 1;

                checkTeamIdExist(totalPlayoffList, team.TeamId, function(teamIdExists) {
                    if (!teamIdExists) {
                        totalPlayoffList.push(playoffObj);
                    } else {
                        async.each(totalPlayoffList, function(playoffTeam, pfCallback) {
                            if (team.TeamId === playoffTeam.TeamId) {
                                if (playoffTeam.finishes[finish]) {
                                    playoffTeam.finishes[finish] += 1;
                                } else {
                                    playoffTeam.finishes[finish] = 1;
                                }
                            }
                            pfCallback(null, team);
                        }, function(err){
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    seriesCallback(null, finish);
                });
            }, function(err){
                callback(null, playoffTeamList);
            });
        });
    })
}

function resetTeamInfo(team, callback) {
    const startPoints = Math.round((team.Wins + (1 - (team.PointsRank * .03))) * 100)/100;
    const newTeam = Object.assign({}, team, {playoffPerc: 0}, {firstPlacePerc: 0}, {secondPlacePerc: 0}, {startPoints});
    callback(null, newTeam);
}

function resetSimWins(team, callback) {
    const newTeam = Object.assign({}, team, {playoffScore: 0}, {simWins: 0});
    callback(null, newTeam);
}

function updatePlayoffCount(teams, totalPlayoffList, simulations, callback) {
    async.map(teams, function (team, teamsCallback) {
        checkTeamIdExist(totalPlayoffList, team.TeamId, function(teamIdExists) {
            let firstPlaceCount = 0;
            let secondPlaceCount = 0;
            let totalCount = 0;

            if (!teamIdExists) {
                team.firstPlacePerc = 0;
                team.secondPlacePerc = 0;
                team.playoffPerc = 0;
                teamsCallback(null, team);
            } else {
                async.each(totalPlayoffList, function(playoffTeam, pfCallback) {
                    if (team.TeamId === playoffTeam.TeamId) {
                        if (playoffTeam.finishes["first"]) {
                            firstPlaceCount = playoffTeam.finishes["first"];
                        }
                        if (playoffTeam.finishes["second"]) {
                            secondPlaceCount = playoffTeam.finishes["second"];
                        }
                        totalCount = sum(playoffTeam.finishes);
                    }
                    pfCallback(null, team);
                }, function(err){
                    if (err) {
                        console.log(err);
                    }
                    team.firstPlacePerc = Math.round((firstPlaceCount*10000)/simulations)/100;
                    team.secondPlacePerc = Math.round((secondPlaceCount*10000)/simulations)/100;
                    team.playoffPerc = Math.round((totalCount*10000)/simulations)/100;
                    teamsCallback(null, team);
                });
            }
        });
    }, function (err, teamsRes) {
        callback(null, teamsRes)
    })
}

const monteCarloSim = function(teams, weeklyMatchups, leaguePlayoffSettings, simulations, callback) {
    totalPlayoffList.splice(0,totalPlayoffList.length);
    async.map(teams, resetTeamInfo, function (err, teamsRes) {
        async.timesLimit(simulations, 1, function(n, next) {
            simWeeklyMatchups(teamsRes, weeklyMatchups, leaguePlayoffSettings.playoffTeams, function(err, trialRes) {
                next(err, trialRes);
            });
        }, function(err) {
            updatePlayoffCount(teams, totalPlayoffList, simulations, function(err, playoffRes) {
                if (!err) {
                    console.log('Simulation Completed successfully!');
                } else {
                    console.log('Error! ', err);
                }
                callback(null, playoffRes);
            })
        });
    });
}

export default monteCarloSim;
