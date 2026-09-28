// ======================================
// DASHBOARD
// ======================================

function loadDashboard() {


    // ==================================
    // TOTAL RESIDENTS
    // ==================================

    fetch("/api/resident/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Resident API failed");
            }

            return response.json();
        })

        .then(data => {

            const element =
                document.getElementById("residentCount");

            if (element) {
                element.innerText = data.length;
            }

        })

        .catch(error => {

            console.error(
                "Resident API Error:",
                error
            );

        });


    // ==================================
    // TOTAL VISITORS
    // ==================================

    fetch("/api/visitor/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Visitor API failed");
            }

            return response.json();
        })

        .then(data => {

            const element =
                document.getElementById("visitorCount");

            if (element) {
                element.innerText = data.length;
            }

        })

        .catch(error => {

            console.error(
                "Visitor API Error:",
                error
            );

        });


    // ==================================
    // ENTRY RECORDS
    // ==================================

    fetch("/api/entry/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Entry API failed");
            }

            return response.json();
        })

        .then(data => {


            const entryElement =
                document.getElementById("entryCount");


            if (entryElement) {
                entryElement.innerText = data.length;
            }


            // Count IN and OUT

            let inside = 0;

            let exited = 0;


            data.forEach(entry => {

                if (entry.status === "IN") {
                    inside++;
                }

                if (entry.status === "OUT") {
                    exited++;
                }

            });


            const inElement =
                document.getElementById("inCount");


            if (inElement) {
                inElement.innerText = inside;
            }


            const outElement =
                document.getElementById("outCount");


            if (outElement) {
                outElement.innerText = exited;
            }

        })

        .catch(error => {

            console.error(
                "Entry API Error:",
                error
            );

        });


    // ==================================
    // SECURITY GUARDS
    // ==================================

    fetch("/api/guard/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Guard API failed");
            }

            return response.json();
        })

        .then(data => {

            const element =
                document.getElementById("guardCount");


            if (element) {
                element.innerText = data.length;
            }

        })

        .catch(error => {

            console.error(
                "Guard API Error:",
                error
            );

        });

}


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

    }
);