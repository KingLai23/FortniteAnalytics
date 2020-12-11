import './search_player.css';
import React, { useState } from 'react';
import axios from 'axios'
import nogops from "./Images/nogops.png";

const SearchPlayer = () => {
    const [showStats, setShowStats] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [found, setFound] = useState(-1);
    const [loading, setloading] = useState(false);

    const [playerName, setPlayerName] = useState("");
    const [soloStats, setSoloStats] = useState();
    const [duoStats, setDuoStats] = useState();
    const [squadStats, setSquadStats] = useState();
    const [totalStats, setTotalStats] = useState();

    const seasonDdInfo = ["Lifetime", "Season 15"];
    const [currentSeason, setCurrentSeason] = useState(0);
    const [openSeasonDd, setOpenSeasonDd] = useState(false);

    const buttonIcon = ">>";

    const searchForUser = (seasonNum, name) => {
        if (name !== '') {
            setloading(true);

            var queryParam1 = "playerName=" + name;
            var queryParam2 = "&season=";

            if (seasonNum === 0) {
                queryParam2 += 'all';
            } else {
                queryParam2 += '15';
            }

            var url = "https://agile-everglades-09462.herokuapp.com/playerStats?" + queryParam1 + queryParam2;

            console.log(url);

            axios.get(url)
                .then(res => {

                    setCurrentSeason(seasonNum);

                    if (res.data.status === "Good") {
                        setSoloStats(res.data.data.solos);
                        setDuoStats(res.data.data.duos);
                        setSquadStats(res.data.data.squads);
                        setTotalStats(res.data.data.total);

                        setPlayerName(res.data.data.username);

                        setShowStats(true);
                        setFound(1);

                        setSearchName('')
                    } else if (res.data.status === "dne") {
                        setFound(0);
                        setShowStats(false);
                    } else {
                        setFound(2);
                        setShowStats(false);
                    }

                    setloading(false);
                })
        }
    }

    const toggleDd = () => {
        setOpenSeasonDd(!openSeasonDd);
    }

    const setSeason = (selectedSeason) => {
        toggleDd();
        setCurrentSeason(selectedSeason);
        searchForUser(selectedSeason, playerName);
    }

    return (
        <div className="search_player">
            { loading ? (
                <div id="overlay">
                    <div className="loading-symbol"></div>
                    <div className="loading-msg">Fetching {searchName}'s stats.</div>
                </div>
            ) : (
                    <></>
                )}

            { !showStats || found !== 1 ? (
                <div className="search_screen">
                    <div className="prompt">
                        <h1>Get Your Stats!</h1>
                    </div>

                    <div className="search_bar">
                        <div className="textarea-wrap">
                            <textarea
                                placeholder="Enter your EPIC name."
                                name="search_bar"
                                id="search_bar"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                        searchForUser(0, searchName)
                                    }
                                }}
                            />
                        </div>

                        {/* <div className="searchbtn-wrap">
                            <button>{buttonIcon}</button>
                        </div> */}


                    </div>

                    { found === 0 ? (
                        <div className="player-not-found">
                            <p>Oops. We couldn't find the player you're looking for.. :(</p>
                            <p>Are you sure you've got the right name?</p>
                        </div>
                    ) : (
                            <>
                            </>
                        )}

                    { found === 2 ? (
                        <div className="player-not-found">
                            <p>Darn. We couldn't find stats for the player your're looking for.. :(</p>
                        </div>
                    ) : (
                            <>
                            </>
                        )}
                    <div className="nog-ops"><img src={nogops}></img></div>
                    <div className="footer2">King Lai &copy; 2020</div>
                </div>
            ) : (
                    <>
                        <div className="viewStats">
                            <div className="prompt2">
                                <h1>Find Another Player.</h1>
                            </div>
                            <div className="search_bar2">
                                <textarea
                                    placeholder="Enter another EPIC name."
                                    name="search_bar"
                                    id="search_bar"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault()
                                            searchForUser(0, searchName)
                                        }
                                    }}
                                />
                            </div>

                            <div className="player_stats">
                                <div className="left_section">
                                    <div className="player_name">{playerName}</div>

                                    <div className="seasonDd">
                                        <div className="seasonDdHeader" onClick={() => toggleDd()}>
                                            <p>{seasonDdInfo[currentSeason]}</p>
                                        </div>
                                        {openSeasonDd && <ul className="dd-list">
                                            {seasonDdInfo.map((item, index) => (
                                                <li className="dd-list-item" key={item} onClick={() => setSeason(index)}>{seasonDdInfo[index]}</li>
                                            ))}
                                        </ul>}
                                    </div>

                                    <div className="stat_summary">Summary</div>

                                    <div className="solo_sum">
                                        <div className="sum_title"><p>Solos</p></div>
                                        <div className="sum_stats_upper">
                                            <div className="top-left-sum">
                                                <span className="sum_stats_category">Matches</span>

                                                {soloStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{soloStats.matchesplayed}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}


                                            </div>
                                            <div className="top-mid-sum">
                                                <span className="sum_stats_category">K/D</span>
                                                {soloStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{soloStats.kd}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="top-right-sum">
                                                <span className="sum_stats_category">Win Rate</span>
                                                {soloStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{soloStats.winrate}%</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="sum_stats_lower">
                                            <div className="lower-left-sum">
                                                <span className="sum_stats_category">Wins</span>
                                                {soloStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{soloStats.placetop1}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="lower-right-sum">
                                                <span className="sum_stats_category">Kills</span>
                                                {soloStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{soloStats.kills}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="duo_sum">
                                        <div className="sum_title"><p>Duos</p></div>
                                        <div className="sum_stats_upper">
                                            <div className="top-left-sum">
                                                <span className="sum_stats_category">Matches</span>

                                                {duoStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{duoStats.matchesplayed}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}


                                            </div>
                                            <div className="top-mid-sum">
                                                <span className="sum_stats_category">K/D</span>
                                                {duoStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{duoStats.kd}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="top-right-sum">
                                                <span className="sum_stats_category">Win Rate</span>
                                                {duoStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{duoStats.winrate}%</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="sum_stats_lower">
                                            <div className="lower-left-sum">
                                                <span className="sum_stats_category">Wins</span>
                                                {duoStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{duoStats.placetop1}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="lower-right-sum">
                                                <span className="sum_stats_category">Kills</span>
                                                {duoStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{duoStats.kills}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="squad_sum">
                                        <div className="sum_title"><p>Squads</p></div>
                                        <div className="sum_stats_upper">
                                            <div className="top-left-sum">
                                                <span className="sum_stats_category">Matches</span>

                                                {squadStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{squadStats.matchesplayed}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}


                                            </div>
                                            <div className="top-mid-sum">
                                                <span className="sum_stats_category">K/D</span>
                                                {squadStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{squadStats.kd}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="top-right-sum">
                                                <span className="sum_stats_category">Win Rate</span>
                                                {squadStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{squadStats.winrate}%</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="sum_stats_lower">
                                            <div className="lower-left-sum">
                                                <span className="sum_stats_category">Wins</span>
                                                {squadStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{squadStats.placetop1}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="lower-right-sum">
                                                <span className="sum_stats_category">Kills</span>
                                                {squadStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{squadStats.kills}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="total_sum">
                                        <div className="sum_title"><p>Totals</p></div>
                                        <div className="sum_stats_upper">
                                            <div className="top-left-sum">
                                                <span className="sum_stats_category">Matches</span>

                                                {totalStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{totalStats.matchesplayed}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}


                                            </div>
                                            <div className="top-mid-sum">
                                                <span className="sum_stats_category">K/D</span>
                                                {totalStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{totalStats.kd}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="top-right-sum">
                                                <span className="sum_stats_category">Win Rate</span>
                                                {totalStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{totalStats.winrate}%</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="sum_stats_lower">
                                            <div className="lower-left-sum">
                                                <span className="sum_stats_category">Wins</span>
                                                {totalStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{totalStats.placetop1}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                            <div className="lower-right-sum">
                                                <span className="sum_stats_category">Kills</span>
                                                {totalStats.found === 1 ? (
                                                    <div className="sum_stats_value">
                                                        <p>{totalStats.kills}</p>
                                                    </div>
                                                ) : (
                                                        <>
                                                            <p> - </p>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="right_section">
                                    <div className="solo_section">
                                        <div className="section_title">Solos</div>

                                        {soloStats.found === 1 ? (
                                            <div className="stats">
                                                <div className="left_stats">
                                                    <p><span className="categories">Matches</span> {soloStats.matchesplayed}</p>
                                                    <p><span className="categories">Wins</span> {soloStats.placetop1}</p>
                                                    <p><span className="categories">Win Rate</span> {soloStats.winrate}%</p>
                                                </div>
                                                <div className="mid_left_stats">
                                                    <p><span className="categories">Kills</span> {soloStats.kills}</p>
                                                    <p><span className="categories">K/D</span> {soloStats.kd}</p>
                                                    <p><span className="categories">K/M</span> {soloStats.km}</p>
                                                </div>
                                                <div className="mid_right_stats">
                                                    <p><span className="categories">Outlived</span> {soloStats.playersoutlived}</p>
                                                    <p><span className="categories">Outlive/M</span> {soloStats.outlivedpermatch}</p>
                                                    <p><span className="categories">T. Time</span> {(soloStats.minutesplayed / 60).toPrecision(3)}h</p>
                                                </div>
                                                <div className="right_stats">
                                                    <p><span className="categories">Avg. M. Time</span> {soloStats.minutespermatch}min</p>
                                                    <p><span className="categories">Top 10</span> {soloStats.placetop10}</p>
                                                    <p><span className="categories">Top 25</span> {soloStats.placetop25}</p>
                                                </div>
                                            </div>
                                        ) : (
                                                <>
                                                    <div className="stat_dne">
                                                        <p>No stats found for solos.. :(</p>
                                                    </div>
                                                </>
                                            )}

                                    </div>

                                    <div className="duo_section">
                                        <div className="section_title">Duos</div>

                                        {duoStats.found === 1 ? (
                                            <div className="stats">
                                                <div className="left_stats">
                                                    <p><span className="categories">Matches</span> {duoStats.matchesplayed}</p>
                                                    <p><span className="categories">Wins</span> {duoStats.placetop1}</p>
                                                    <p><span className="categories">Win Rate</span> {duoStats.winrate}%</p>
                                                </div>
                                                <div className="mid_left_stats">
                                                    <p><span className="categories">Kills</span> {duoStats.kills}</p>
                                                    <p><span className="categories">K/D</span> {duoStats.kd}</p>
                                                    <p><span className="categories">K/M</span> {duoStats.km}</p>
                                                </div>
                                                <div className="mid_right_stats">
                                                    <p><span className="categories">Outlived</span> {duoStats.playersoutlived}</p>
                                                    <p><span className="categories">Outlive/M</span> {duoStats.outlivedpermatch}</p>
                                                    <p><span className="categories">T. Time</span> {(duoStats.minutesplayed / 60).toPrecision(3)}h</p>
                                                </div>
                                                <div className="right_stats">
                                                    <p><span className="categories">Avg. M. Time</span> {duoStats.minutespermatch}min</p>
                                                    <p><span className="categories">Top 5</span> {duoStats.placetop5}</p>
                                                    <p><span className="categories">Top 12</span> {duoStats.placetop12}</p>
                                                </div>
                                            </div>
                                        ) : (
                                                <>
                                                    <div className="stat_dne">
                                                        <p>No stats found for duos.. :(</p>
                                                    </div>
                                                </>
                                            )}

                                    </div>

                                    <div className="squad_section">
                                        <div className="section_title">Squads</div>

                                        {squadStats.found === 1 ? (
                                            <div className="stats">
                                                <div className="left_stats">
                                                    <p><span className="categories">Matches</span> {squadStats.matchesplayed}</p>
                                                    <p><span className="categories">Wins</span> {squadStats.placetop1}</p>
                                                    <p><span className="categories">Win Rate</span> {squadStats.winrate}%</p>
                                                </div>
                                                <div className="mid_left_stats">
                                                    <p><span className="categories">Kills</span> {squadStats.kills}</p>
                                                    <p><span className="categories">K/D</span> {squadStats.kd}</p>
                                                    <p><span className="categories">K/M</span> {squadStats.km}</p>
                                                </div>
                                                <div className="mid_right_stats">
                                                    <p><span className="categories">Outlived</span> {squadStats.playersoutlived}</p>
                                                    <p><span className="categories">Outlive/M</span> {squadStats.outlivedpermatch}</p>
                                                    <p><span className="categories">T. Time</span> {(squadStats.minutesplayed / 60).toPrecision(3)}h</p>
                                                </div>
                                                <div className="right_stats">
                                                    <p><span className="categories">Avg. M. Time</span> {squadStats.minutespermatch}min</p>
                                                    <p><span className="categories">Top 3</span> {squadStats.placetop3}</p>
                                                    <p><span className="categories">Top 6</span> {squadStats.placetop6}</p>
                                                </div>
                                            </div>
                                        ) : (
                                                <>
                                                    <div className="stat_dne">
                                                        <p>No stats found for squads.. :(</p>
                                                    </div>
                                                </>
                                            )}

                                    </div>

                                    <div className="total_section">
                                        <div className="section_title">Totals</div>

                                        {totalStats.found === 1 ? (
                                            <div className="stats">
                                                <div className="left_stats">
                                                    <p><span className="categories">Matches</span> {totalStats.matchesplayed}</p>
                                                    <p><span className="categories">Wins</span> {totalStats.placetop1}</p>
                                                    <p><span className="categories">Win Rate</span> {totalStats.winrate}%</p>
                                                </div>
                                                <div className="mid_left_stats">
                                                    <p><span className="categories">Kills</span> {totalStats.kills}</p>
                                                    <p><span className="categories">K/D</span> {totalStats.kd}</p>
                                                    <p><span className="categories">K/M</span> {totalStats.km}</p>
                                                </div>
                                                <div className="mid_right_stats">
                                                    <p><span className="categories">Outlived</span> {totalStats.playeresoutlived}</p>
                                                    <p><span className="categories">Outlive/M</span> {totalStats.outlivedpermatch}</p>
                                                    <p><span className="categories">T. Time</span> {(totalStats.minutesplayed / 60).toPrecision(3)}h</p>
                                                </div>
                                                <div className="right_stats">
                                                    <p><span className="categories">Avg. M. Time</span> {totalStats.minutespermatch}min</p>
                                                    <p><span className="categories">Top 10</span> {totalStats.placetop10}</p>
                                                    <p><span className="categories">Top 25</span> {totalStats.placetop25}</p>
                                                </div>
                                            </div>
                                        ) : (
                                                <>
                                                    <div className="stat_dne">
                                                        <p>No total stats found.. :(</p>
                                                    </div>
                                                </>

                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer">King Lai &copy; 2020</div>
                    </>
                )
            }
        </div >
    )
}

export default SearchPlayer;