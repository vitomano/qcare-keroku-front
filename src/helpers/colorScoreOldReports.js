import { View, StyleSheet, Text } from "@react-pdf/renderer";

// Establece color por score

export function colorScoreOldReports(score="0"){

    if (score === "0") {
        return (
            <div className="score score-0">
                <p>No Score</p>
            </div>)
    }
    if (score === "1") {
        return (
            <div className="score score-1">
                <p>1 of 8</p>
            </div>)
    }
    if (score === "2") {
        return (
            <div className="score score-3">
                <p>3 of 8</p>
            </div>)
    }
    if (score === "3") {
        return (
            <div className="score score-5">
                <p>5 of 8</p>
            </div>)
    }
    if (score === "4") {
        return (
            <div className="score score-7">
                <p>7 of 8</p>
            </div>)
    }
    if (score === "5") {
        return (
            <div className="score score-8">
                <p>8 of 8</p>
            </div>)
    }

}

export function colorScoreString(score){

    if (score === "0") {
        return "No Score"
    }
    if (score === "1") {
        return "1"
    }
    if (score === "2") {
        return "2"
    }
    if (score === "3") {
        return "3"
    }
    if (score === "4") {
        return "4"
    }
    if (score === "5") {
        return "5"
    }
    if (score === "6") {
        return "6"
    }
    if (score === "7") {
        return "7"
    }
    if (score === "8") {
        return "8"
    } else {
        return score
    }

}

export function colorScorePdfOldReport(score="0"){

    if (score === "0") {
        return (
            <View style={[styles.score, {backgroundColor: "#C2C2C2", color: "black"}]}>
                <Text style={styles.scroreText}>No Score</Text>
            </View>
            )
    }
    if (score === "1") {
        return (
            <View style={[styles.score, {backgroundColor: "#b20016", color: "white"}]}>
                <Text style={styles.scroreText}>1 of 8</Text>
            </View>
            )
    }
    if (score === "2") {
        return (
            <View style={[styles.score, {backgroundColor: "#ef7100", color: "black"}]}>
                <Text style={styles.scroreText}>3 of 8</Text>
            </View>
            )
    }
    if (score === "3") {
        return (
            <View style={[styles.score, {backgroundColor: "#fcee21", color: "black"}]}>
                <Text style={styles.scroreText}>5 of 8</Text>
            </View>
            )
    }
    if (score === "4") {
        return (
            <View style={[styles.score, {backgroundColor: "#39b54a", color: "white"}]}>
                <Text style={styles.scroreText}>7 of 8</Text>
            </View>
            )
    }
    if (score === "5") {
        return (
            <View style={[styles.score, {backgroundColor: "#007f2d", color: "white"}]}>
                <Text style={styles.scroreText}>8 of 8</Text>
            </View>
            )
    }

}

const styles = StyleSheet.create({
    score: {
        minWidth: "80px",
        minHeight: "22px",
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderRadius: 50,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    scroreText:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "12px",
        alignSelf: "center"
    }

});