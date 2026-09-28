document.addEventListener("DOMContentLoaded", function () {

    loadDashboard();
    loadVisitors();
    loadResidents();
    loadGuards();
    loadEntries();

    setupVisitorForm();
    setupResidentForm();
    setupGuardForm();
    setupGateForm();
    setupExitForm();

});


/* =====================================================
   GET FIELD - CASE INSENSITIVE
===================================================== */

function getField(obj, field) {

    if (!obj) {
        return "";
    }

    // Exact field
    if (obj[field] !== undefined && obj[field] !== null) {
        return obj[field];
    }

    // Case-insensitive field search
    const wanted = field.toLowerCase();

    const key = Object.keys(obj).find(
        k => k.toLowerCase() === wanted
    );

    if (key) {
        return obj[key] ?? "";
    }

    return "";
}


/* =====================================================
   DASHBOARD
===================================================== */

function loadDashboard() {

    const residentCount =
        document.getElementById("residentCount");

    const visitorCount =
        document.getElementById("visitorCount");

    const entryCount =
        document.getElementById("entryCount");

    const guardCount =
        document.getElementById("guardCount");

    const inCount =
        document.getElementById("inCount");

    const outCount =
        document.getElementById("outCount");


    if (residentCount) {

        fetch("/api/resident/getall")
            .then(r => r.json())
            .then(data => {

                residentCount.innerText =
                    Array.isArray(data)
                        ? data.length
                        : 0;

            })
            .catch(err => {

                console.error(err);
                residentCount.innerText = "0";

            });
    }


    if (visitorCount) {

        fetch("/api/visitor/getall")
            .then(r => r.json())
            .then(data => {

                visitorCount.innerText =
                    Array.isArray(data)
                        ? data.length
                        : 0;

            })
            .catch(err => {

                console.error(err);
                visitorCount.innerText = "0";

            });
    }


    if (entryCount) {

        fetch("/api/entry/getall")
            .then(r => r.json())
            .then(data => {

                if (!Array.isArray(data)) {
                    return;
                }

                entryCount.innerText = data.length;

                let inside = 0;
                let outside = 0;

                data.forEach(entry => {

                    const status =
                        getField(entry, "status");

                    if (status === "IN") {
                        inside++;
                    }

                    if (status === "OUT") {
                        outside++;
                    }

                });

                if (inCount) {
                    inCount.innerText = inside;
                }

                if (outCount) {
                    outCount.innerText = outside;
                }

            })
            .catch(err => {

                console.error(err);
                entryCount.innerText = "0";

            });
    }


    if (guardCount) {

        fetch("/api/guard/getall")
            .then(r => r.json())
            .then(data => {

                guardCount.innerText =
                    Array.isArray(data)
                        ? data.length
                        : 0;

            })
            .catch(err => {

                console.error(err);
                guardCount.innerText = "0";

            });
    }

}


/* =====================================================
   VISITORS
===================================================== */

function loadVisitors() {

    const table =
        document.getElementById("visitorTableBody");

    if (!table) {
        return;
    }


    fetch("/api/visitor/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Visitor API returned " +
                    response.status
                );
            }

            return response.json();

        })

        .then(data => {

            console.log("VISITOR API DATA:", data);

            table.innerHTML = "";

            if (!Array.isArray(data)) {
                return;
            }


            data.forEach(visitor => {

                const id =
                    getField(visitor, "Id");

                const name =
                    getField(visitor, "Name");

                const phone =
                    getField(visitor, "phone");

                const visitDate =
                    getField(visitor, "VisitDate");

                const fromTime =
                    getField(visitor, "FromTime");

                const toTime =
                    getField(visitor, "ToTime");

                const flatId =
                    getField(visitor, "FlatId");


                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td>${visitDate}</td>
                    <td>${fromTime}</td>
                    <td>${toTime}</td>
                    <td>${flatId}</td>
                `;


                table.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Visitor API Error:",
                error
            );

        });

}


/* =====================================================
   RESIDENTS
===================================================== */

function loadResidents() {

    const table =
        document.getElementById(
            "residentTableBody"
        );

    if (!table) {
        return;
    }


    fetch("/api/resident/getall")

        .then(response => response.json())

        .then(data => {

            console.log(
                "RESIDENT API DATA:",
                data
            );

            table.innerHTML = "";


            if (!Array.isArray(data)) {
                return;
            }


            data.forEach(resident => {

                const id =
                    getField(resident, "Id");

                const name =
                    getField(resident, "Name");

                const phone =
                    getField(resident, "Phone");

                const email =
                    getField(resident, "Email");

                const flatId =
                    getField(resident, "FlatId");


                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${flatId}</td>
                `;


                table.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Resident API Error:",
                error
            );

        });

}


/* =====================================================
   GUARDS
===================================================== */

function loadGuards() {

    const table =
        document.getElementById(
            "guardTableBody"
        );

    if (!table) {
        return;
    }


    fetch("/api/guard/getall")

        .then(response => response.json())

        .then(data => {

            console.log(
                "GUARD API DATA:",
                data
            );

            table.innerHTML = "";


            if (!Array.isArray(data)) {
                return;
            }


            data.forEach(guard => {

                const id =
                    getField(guard, "Id");

                const name =
                    getField(guard, "Name");

                const phone =
                    getField(guard, "Phone");

                const email =
                    getField(guard, "Email");

                const address =
                    getField(guard, "Address");

                const shift =
                    getField(guard, "Shift");


                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${address}</td>
                    <td>${shift}</td>
                `;


                table.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Guard API Error:",
                error
            );

        });

}


/* =====================================================
   ENTRY / EXIT
===================================================== */

function loadEntries() {

    const table =
        document.getElementById(
            "entryTableBody"
        );

    if (!table) {
        return;
    }


    fetch("/api/entry/getall")

        .then(response => response.json())

        .then(data => {

            console.log(
                "ENTRY API DATA:",
                data
            );

            table.innerHTML = "";


            if (!Array.isArray(data)) {
                return;
            }


            data.forEach(entry => {

                const id =
                    getField(entry, "Id");

                const phone =
                    getField(entry, "phone");

                const entryTime =
                    getField(entry, "entryTime");

                const exitTime =
                    getField(entry, "exitTime");

                const status =
                    getField(entry, "status");


                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>${id}</td>
                    <td>${phone}</td>
                    <td>${entryTime}</td>
                    <td>${exitTime || "-"}</td>
                    <td>${status}</td>
                `;


                table.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Entry API Error:",
                error
            );

        });

}


/* =====================================================
   VISITOR FORM
===================================================== */

function setupVisitorForm() {

    const form =
        document.getElementById("visitorForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const visitor = {

            Name:
            document.getElementById(
                "visitorName"
            ).value,

            phone:
            document.getElementById(
                "visitorPhone"
            ).value,

            VisitDate:
            document.getElementById(
                "visitDate"
            ).value,

            FromTime:
            document.getElementById(
                "fromTime"
            ).value,

            ToTime:
            document.getElementById(
                "toTime"
            ).value,

            FlatId:
                Number(
                    document.getElementById(
                        "flatId"
                    ).value
                )

        };


        fetch("/api/visitor/create", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(visitor)

        })

            .then(async response => {

                const text =
                    await response.text();

                if (!response.ok) {
                    throw new Error(text);
                }

                return text;

            })

            .then(message => {

                alert(
                    message ||
                    "Visitor approved successfully"
                );

                form.reset();

                loadVisitors();

            })

            .catch(error => {

                console.error(error);

                alert(
                    error.message ||
                    "Visitor creation failed"
                );

            });

    });

}


/* =====================================================
   RESIDENT FORM
===================================================== */

function setupResidentForm() {

    const form =
        document.getElementById(
            "residentForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const resident = {

            Name:
            document.getElementById(
                "residentName"
            ).value,

            Phone:
            document.getElementById(
                "residentPhone"
            ).value,

            Email:
            document.getElementById(
                "residentEmail"
            ).value,

            FlatId:
                Number(
                    document.getElementById(
                        "residentFlat"
                    ).value
                )

        };


        fetch("/api/resident/create", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(resident)

        })

            .then(async response => {

                const text =
                    await response.text();

                if (!response.ok) {
                    throw new Error(text);
                }

                return text;

            })

            .then(message => {

                alert(
                    message ||
                    "Resident added successfully"
                );

                form.reset();

                loadResidents();

            })

            .catch(error => {

                console.error(error);

                alert(
                    error.message ||
                    "Resident creation failed"
                );

            });

    });

}


/* =====================================================
   GUARD FORM
===================================================== */

function setupGuardForm() {

    const form =
        document.getElementById("guardForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const guard = {

            Name:
            document.getElementById(
                "guardName"
            ).value,

            Phone:
            document.getElementById(
                "guardPhone"
            ).value,

            Email:
            document.getElementById(
                "guardEmail"
            ).value,

            Address:
            document.getElementById(
                "guardAddress"
            ).value,

            Shift:
            document.getElementById(
                "guardShift"
            ).value

        };


        fetch("/api/guard/create", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(guard)

        })

            .then(async response => {

                const text =
                    await response.text();

                if (!response.ok) {
                    throw new Error(text);
                }

                return text;

            })

            .then(message => {

                alert(
                    message ||
                    "Guard added successfully"
                );

                form.reset();

                loadGuards();

            })

            .catch(error => {

                console.error(error);

                alert(
                    error.message ||
                    "Guard creation failed"
                );

            });

    });

}


/* =====================================================
   GATE VERIFY
===================================================== */

function setupGateForm() {

    const form =
        document.getElementById("gateForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const phone =
            document.getElementById(
                "gatePhone"
            ).value;


        fetch("/api/gate/verify", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    phone: phone
                })

        })

            .then(async response => {

                const text =
                    await response.text();

                if (!response.ok) {
                    throw new Error(text);
                }

                return text;

            })

            .then(message => {

                alert(
                    message ||
                    "Visitor verified - Entry Allowed"
                );

                loadEntries();

            })

            .catch(error => {

                console.error(error);

                alert(
                    error.message ||
                    "Entry rejected"
                );

            });

    });

}


/* =====================================================
   EXIT
===================================================== */

function setupExitForm() {

    const form =
        document.getElementById(
            "exitForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const phone =
            document.getElementById(
                "exitPhone"
            ).value;


        fetch("/api/entry/exit", {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    phone: phone
                })

        })

            .then(async response => {

                const text =
                    await response.text();

                if (!response.ok) {
                    throw new Error(text);
                }

                return text;

            })

            .then(message => {

                alert(
                    message ||
                    "Visitor exit recorded successfully"
                );

                form.reset();

                loadEntries();

            })

            .catch(error => {

                console.error(error);

                alert(
                    error.message ||
                    "Exit failed"
                );

            });

    });

}