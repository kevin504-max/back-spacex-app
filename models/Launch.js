const mongoose = require('mongoose');
const { Schema } = mongoose;

const LaunchSchema = new Schema({
    fairings: {
        reused: Boolean,
        recovery_attempt: Boolean,
        recovered: Boolean,
        ships: [String],
    },
    links: {
        patch: {
            small: String,
            large: String,
        },
        reddit: {
            campaign: String,
            launch: String,
            media: String,
            recovery: String,
        },
        flickr: {
            small: [String],
            original: [String],
        },
        presskit: String,
        webcast: String,
        youtube_id: String,
        article: String,
        wikipedia: String,
    },
    static_fire_date_utc: String,
    static_fire_date_unix: Number,
    net: Boolean,
    window: Number,
    rocket: String,
    success: Boolean,
    failures: [{
        time: Number,
        altitude: Number,
        reason: String,
    }],
    details: String,
    crew: [String],
    ships: [String],
    capsules: [String],
    payloads: [String],
    launchpad: String,
    flight_number: Number,
    name: String,
    date_utc: String,
    date_unix: Number,
    date_local: String,
    date_precision: String,
    upcoming: Boolean,
    cores: [{
        core: String,
        flight: Number,
        gridfins: Boolean,
        legs: Boolean,
        reused: Boolean,
        landing_attempt: Boolean,
        landing_success: Boolean,
        landing_type: String,
        landpad: String,
    }],
    auto_update: Boolean,
    tbd: Boolean,
    launch_library_id: String,
    id: String,
});

module.exports.Launch = mongoose.model('Launch', LaunchSchema);