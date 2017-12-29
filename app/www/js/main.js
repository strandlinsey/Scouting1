$(function () {
    const apiKey = tba.ApiClient.instance.authentications['apiKey'];
    apiKey.apiKey = 'poguusggy4HtnMS6jZI7nEASojzPhzhdIoBUGYUk4QzqZ0FjYiHZLugOhkVl0OKe';

    const matchApi = new tba.MatchApi();

    const templates = {
        container: $(".main"),
        dashboard: {
            template: Handlebars.compile($("#dashboard-template").html()),
            config: {
                "team_number": "4909",
                "api": true,
                "metadata": {
                    "event_match_key": "",
                    "alliances": {
                        blue: ["0000", "0000", "0000"],
                        red: ["0000", "0000", "0000"]
                    }
                }
            },
            redraw: () => {
                templates.container.html(templates.dashboard.template(templates.dashboard.config));

                $("#team_number").on("blur", (event) => {
                    templates.dashboard.config.team_number = $(event.target).text();
                    updateNextMatch();
                });

                $(".dashboard_team_number").on("blur", (event) => {
                    // TODO: Update Team Numbers

                    updateAnalysis();
                });
            }
        }
    };

    // Initialize Templates
    templates.dashboard.redraw();

    updateNextMatch();

    function updateNextMatch() {
        // TODO: Find Next Match
        const err = "Not Implemented";

        templates.dashboard.config.metadata.event_match_key = "";
        templates.dashboard.config.api = !exists(err);


        getMatchSimple(templates.dashboard.config.metadata.event_match_key, (match_metadata, err) => {
            if (!exists(err)) {
                templates.dashboard.config.metadata = match_metadata;
            }

            updateStatistics();
        });
    }

    function updateAnalysis() {
        templates.dashboard.config.metadata.alliances.red.forEach((object, index) => {
            if (object == templates.dashboard.config.team_number) {
                templates.dashboard.config.metadata.alliance_color = "red";
                templates.dashboard.config.metadata.alliance_station = "Red " + (index + 1);
            }
        });

        templates.dashboard.config.metadata.alliances.blue.forEach((object, index) => {
            if (object == templates.dashboard.config.team_number) {
                templates.dashboard.config.metadata.alliance_color = "blue";
                templates.dashboard.config.metadata.alliance_station = "Blue " + (index + 1);
            }
        });

        templates.dashboard.redraw();
    }

    function getMatchSimple(event_match_key, callback) {
        matchApi.getMatchSimple(eventMatchKeyForYear(event_match_key), {}, (err, metadata) => {
            if (!exists(err)) {
                if (exists(metadata.predicted_time)) metadata.time = metadata.predicted_time;

                callback({
                    "event_match_key": metadata.key.slice(4).replace("_", " ").toUpperCase(),
                    "time": moment(metadata.time).format("hh:mm a").toUpperCase(),
                    "alliances": {
                        "blue": $.map(metadata.alliances.blue.team_keys, mapTeamKeyToTeamNum),
                        "red": $.map(metadata.alliances.red.team_keys, mapTeamKeyToTeamNum)
                    }
                }, err);
            } else {
                callback(undefined, err);
            }
        });
    }

    function eventMatchKeyForYear(event_match_key) {
        return config.season + event_match_key.replace(" ", "_").toLowerCase();
    }

    function mapTeamKeyToTeamNum(value) {
        return value.split("frc")[1];
    }

    function exists(object) {
        return typeof object != undefined && object != null;
    }

    $('.page-loader-wrapper').fadeOut();
});
