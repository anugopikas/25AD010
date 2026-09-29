// ======================================================
// VisitorPass - script.js
// ======================================================


// ======================================================
// DASHBOARD
// ======================================================

function loadDashboard() {

    // -----------------------------
    // Resident Count
    // -----------------------------

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
                element.innerText =
                    Array.isArray(data) ? data.length : 0;
            }

        })
        .catch(error => {

            console.error(
                "Resident Dashboard Error:",
                error
            );

        });


    // -----------------------------
    // Visitor Count
    // -----------------------------

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
                element.innerText =
                    Array.isArray(data) ? data.length : 0;
            }

        })
        .catch(error => {

            console.error(
                "Visitor Dashboard Error:",
                error
            );

        });


    // -----------------------------
    // Entry Count
    // -----------------------------

    fetch("/api/entry/getall")
        .then(response => {

            if (!response.ok) {
                throw new Error("Entry API failed");
            }

            return response.json();

        })
        .then(data => {

            if (!Array.isArray(data)) {
                return;
            }


            const entryElement =
                document.getElementById("entryCount");

            const inElement =
                document.getElementById("inCount");

            const outElement =
                document.getElementById("outCount");


            if (entryElement) {

                entryElement.innerText =
                    data.length;

            }


            const inCount =
                data.filter(entry =>
                    String(entry.status || "")
                        .toUpperCase() === "IN"
                ).length;


            const outCount =
                data.filter(entry =>
                    String(entry.status || "")
                        .toUpperCase() === "OUT"
                ).length;


            if (inElement) {
                inElement.innerText =
                    inCount;
            }


            if (outElement) {
                outElement.innerText =
                    outCount;
            }

        })
        .catch(error => {

            console.error(
                "Entry Dashboard Error:",
                error
            );

        });


    // -----------------------------
    // Guard Count
    // -----------------------------

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

                element.innerText =
                    Array.isArray(data)
                        ? data.length
                        : 0;

            }

        })
        .catch(error => {

            console.error(
                "Guard Dashboard Error:",
                error
            );

        });

}


// ======================================================
// RESIDENT - LOAD LIST
// ======================================================

function loadResidents() {

    const table =
        document.getElementById("residentTable");

    if (!table) {
        return;
    }


    fetch("/api/resident/getall")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Resident API failed"
                );

            }

            return response.json();

        })

        .then(data => {

            console.log(
                "Resident data:",
                data
            );


            table.innerHTML = "";


            if (
                !Array.isArray(data) ||
                data.length === 0
            ) {

                table.innerHTML = `
                    <tr>
                        <td colspan="6">
                            No residents found
                        </td>
                    </tr>
                `;

                return;
            }


            data.forEach(resident => {

                const id =
                    resident.Id ??
                    resident.id ??
                    "";

                const name =
                    resident.Name ??
                    resident.name ??
                    "";

                const phone =
                    resident.Phone ??
                    resident.phone ??
                    "";

                const email =
                    resident.Email ??
                    resident.email ??
                    "";

                const address =
                    resident.Address ??
                    resident.address ??
                    "";

                const flatId =
                    resident.FlatId ??
                    resident.flatId ??
                    "";


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${id}</td>

                    <td>${name}</td>

                    <td>${phone}</td>

                    <td>${email}</td>

                    <td>${address}</td>

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


            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load residents
                    </td>
                </tr>
            `;

        });

}


// ======================================================
// RESIDENT - ADD
// ======================================================

function setupResidentForm() {

    const form =
        document.getElementById("residentForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const flatId =
                Number(
                    document
                        .getElementById("flatId")
                        .value
                );


            const message =
                document.getElementById("message");


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit phone number"
                );

                return;
            }


            const resident = {

                Name: name,

                Phone: phone,

                Email: email,

                Address: address,

                FlatId: flatId

            };


            if (message) {

                message.innerText =
                    "Adding resident...";

            }


            fetch(
                "/api/resident/create",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(resident)

                }
            )

                .then(response => {

                    return response.text()
                        .then(data => {

                            return {

                                ok: response.ok,

                                status:
                                response.status,

                                data: data

                            };

                        });

                })

                .then(result => {

                    if (!result.ok) {

                        alert(
                            result.data ||
                            "Failed to add resident"
                        );


                        if (message) {

                            message.innerText =
                                "Failed to add resident";

                        }

                        return;
                    }


                    // Success - inline only

                    if (message) {

                        message.innerText =
                            "Resident added successfully";

                    }


                    form.reset();


                    loadResidents();

                })

                .catch(error => {

                    console.error(
                        "Resident Error:",
                        error
                    );


                    alert(
                        "Unable to connect to server"
                    );


                    if (message) {

                        message.innerText =
                            "Failed to add resident";

                    }

                });

        }
    );

}


// ======================================================
// VISITOR - LOAD LIST
// ======================================================

function loadVisitors() {

    const table =
        document.getElementById("visitorTable");

    if (!table) {
        return;
    }


    fetch("/api/visitor/getall")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Visitor API failed"
                );

            }

            return response.json();

        })

        .then(data => {

            console.log(
                "Visitor data:",
                data
            );


            table.innerHTML = "";


            if (
                !Array.isArray(data) ||
                data.length === 0
            ) {

                table.innerHTML = `
                    <tr>
                        <td colspan="7">
                            No visitors found
                        </td>
                    </tr>
                `;

                return;
            }


            data.forEach(visitor => {

                const id =
                    visitor.Id ??
                    visitor.id ??
                    "";

                const name =
                    visitor.Name ??
                    visitor.name ??
                    "";

                const phone =
                    visitor.phone ??
                    visitor.Phone ??
                    "";

                const visitDate =
                    visitor.VisitDate ??
                    visitor.visitDate ??
                    "";

                const fromTime =
                    visitor.FromTime ??
                    visitor.fromTime ??
                    "";

                const toTime =
                    visitor.ToTime ??
                    visitor.toTime ??
                    "";

                const flatId =
                    visitor.FlatId ??
                    visitor.flatId ??
                    "";


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


            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        Unable to load visitors
                    </td>
                </tr>
            `;

        });

}


// ======================================================
// VISITOR - ADD
// ======================================================

function setupVisitorForm() {

    const form =
        document.getElementById("visitorForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const visitDate =
                document
                    .getElementById("visitDate")
                    .value;


            const fromTime =
                document
                    .getElementById("fromTime")
                    .value;


            const toTime =
                document
                    .getElementById("toTime")
                    .value;


            const flatId =
                Number(
                    document
                        .getElementById("flatId")
                        .value
                );


            const message =
                document.getElementById("message");


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit phone number"
                );

                return;
            }


            if (fromTime >= toTime) {

                alert(
                    "To Time must be greater than From Time"
                );

                return;
            }


            const visitor = {

                Name: name,

                phone: phone,

                VisitDate: visitDate,

                FromTime: fromTime,

                ToTime: toTime,

                FlatId: flatId

            };


            if (message) {

                message.innerText =
                    "Adding visitor...";

            }


            fetch(
                "/api/visitor/create",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(visitor)

                }
            )

                .then(response => {

                    return response.text()
                        .then(data => {

                            return {

                                ok: response.ok,

                                status:
                                response.status,

                                data: data

                            };

                        });

                })

                .then(result => {

                    if (!result.ok) {

                        alert(
                            result.data ||
                            "Failed to add visitor"
                        );


                        if (message) {

                            message.innerText =
                                "Failed to add visitor";

                        }

                        return;
                    }


                    // Success - inline only

                    if (message) {

                        message.innerText =
                            "Visitor added successfully";

                    }


                    form.reset();


                    loadVisitors();

                })

                .catch(error => {

                    console.error(
                        "Visitor Error:",
                        error
                    );


                    alert(
                        "Unable to connect to server"
                    );


                    if (message) {

                        message.innerText =
                            "Failed to add visitor";

                    }

                });

        }
    );

}


// ======================================================
// GATE VERIFICATION
// ======================================================

function setupGateForm() {

    const form =
        document.getElementById("gateForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const message =
                document.getElementById("message");


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit phone number"
                );

                return;
            }


            if (message) {

                message.innerText =
                    "Verifying visitor...";

            }


            fetch(
                "/api/gate/verify?phone=" +
                encodeURIComponent(phone),
                {
                    method: "POST"
                }
            )

                .then(response => {

                    return response.text()
                        .then(data => {

                            return {

                                ok: response.ok,

                                status:
                                response.status,

                                data: data

                            };

                        });

                })

                .then(result => {

                    if (!result.ok) {

                        alert(
                            result.data ||
                            "Gate verification failed"
                        );


                        if (message) {

                            message.innerText =
                                "Gate verification failed";

                        }

                        return;
                    }


                    // Success - inline only

                    if (message) {

                        message.innerText =
                            result.data ||
                            "Visitor verified successfully";

                    }

                })

                .catch(error => {

                    console.error(
                        "Gate Error:",
                        error
                    );


                    alert(
                        "Unable to connect to server"
                    );


                    if (message) {

                        message.innerText =
                            "Verification failed";

                    }

                });

        }
    );

}


// ======================================================
// ENTRY LIST
// ======================================================

function loadEntries() {

    const table =
        document.getElementById("entryTable");

    if (!table) {
        return;
    }


    fetch("/api/entry/getall")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Entry API failed"
                );

            }

            return response.json();

        })

        .then(data => {

            table.innerHTML = "";


            if (
                !Array.isArray(data) ||
                data.length === 0
            ) {

                table.innerHTML = `
                    <tr>
                        <td colspan="5">
                            No entry records found
                        </td>
                    </tr>
                `;

                return;
            }


            data.forEach(entry => {

                const id =
                    entry.Id ??
                    entry.id ??
                    "";

                const phone =
                    entry.phone ??
                    entry.Phone ??
                    "";

                const entryTime =
                    entry.entryTime ??
                    "";

                const exitTime =
                    entry.exitTime ??
                    "-";

                const status =
                    entry.status ??
                    "";


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${id}</td>

                    <td>${phone}</td>

                    <td>${entryTime}</td>

                    <td>${exitTime}</td>

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


            table.innerHTML = `
                <tr>
                    <td colspan="5">
                        Unable to load entry records
                    </td>
                </tr>
            `;

        });

}


// ======================================================
// RECORD EXIT
// ======================================================

function setupExitForm() {

    const form =
        document.getElementById("exitForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const message =
                document.getElementById("message");


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit phone number"
                );

                return;
            }


            if (message) {

                message.innerText =
                    "Recording visitor exit...";

            }


            fetch(
                "/api/entry/exit?phone=" +
                encodeURIComponent(phone),
                {
                    method: "POST"
                }
            )

                .then(response => {

                    return response.text()
                        .then(data => {

                            return {

                                ok: response.ok,

                                status:
                                response.status,

                                data: data

                            };

                        });

                })

                .then(result => {

                    if (!result.ok) {

                        alert(
                            result.data ||
                            "Exit failed"
                        );


                        if (message) {

                            message.innerText =
                                "Exit failed";

                        }

                        return;
                    }


                    // Success - inline only

                    if (message) {

                        message.innerText =
                            result.data ||
                            "Visitor exit recorded successfully";

                    }


                    form.reset();


                    loadEntries();

                })

                .catch(error => {

                    console.error(
                        "Exit Error:",
                        error
                    );


                    alert(
                        "Unable to connect to server"
                    );


                    if (message) {

                        message.innerText =
                            "Exit failed";

                    }

                });

        }
    );

}


// ======================================================
// SECURITY GUARD - LOAD
// ======================================================

function loadGuards() {

    const table =
        document.getElementById("guardTable");

    if (!table) {
        return;
    }


    fetch("/api/guard/getall")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Guard API failed"
                );

            }

            return response.json();

        })

        .then(data => {

            table.innerHTML = "";


            if (
                !Array.isArray(data) ||
                data.length === 0
            ) {

                table.innerHTML = `
                    <tr>
                        <td colspan="7">
                            No security guards found
                        </td>
                    </tr>
                `;

                return;
            }


            data.forEach(guard => {

                const id =
                    guard.Id ??
                    guard.id ??
                    "";

                const name =
                    guard.Name ??
                    guard.name ??
                    "";

                const phone =
                    guard.Phone ??
                    guard.phone ??
                    "";

                const email =
                    guard.Email ??
                    guard.email ??
                    "";

                const address =
                    guard.Address ??
                    guard.address ??
                    "";

                const shift =
                    guard.Shift ??
                    guard.shift ??
                    "";


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${id}</td>

                    <td>${name}</td>

                    <td>${phone}</td>

                    <td>${email}</td>

                    <td>${address}</td>

                    <td>${shift}</td>

                    <td>

                        <button
                            type="button"
                            onclick="deleteGuard(${id})"
                        >
                            Delete
                        </button>

                    </td>

                `;


                table.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Guard API Error:",
                error
            );


            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        Unable to load security guards
                    </td>
                </tr>
            `;

        });

}


// ======================================================
// SECURITY GUARD - ADD
// ======================================================

function setupGuardForm() {

    const form =
        document.getElementById("guardForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const shift =
                document
                    .getElementById("shift")
                    .value
                    .trim();


            const message =
                document.getElementById("message");


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit phone number"
                );

                return;
            }


            const guard = {

                Name: name,

                Phone: phone,

                Email: email,

                Address: address,

                Shift: shift

            };


            if (message) {

                message.innerText =
                    "Adding security guard...";

            }


            fetch(
                "/api/guard/create",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(guard)

                }
            )

                .then(response => {

                    return response.text()
                        .then(data => {

                            return {

                                ok: response.ok,

                                status:
                                response.status,

                                data: data

                            };

                        });

                })

                .then(result => {

                    if (!result.ok) {

                        alert(
                            result.data ||
                            "Failed to add security guard"
                        );


                        if (message) {

                            message.innerText =
                                "Failed to add security guard";

                        }

                        return;
                    }


                    // Success - inline only

                    if (message) {

                        message.innerText =
                            "Security guard added successfully";

                    }


                    form.reset();


                    loadGuards();

                })

                .catch(error => {

                    console.error(
                        "Guard Error:",
                        error
                    );


                    alert(
                        "Unable to connect to server"
                    );


                    if (message) {

                        message.innerText =
                            "Failed to add security guard";

                    }

                });

        }
    );

}


// ======================================================
// DELETE GUARD
// ======================================================

function deleteGuard(id) {

    fetch(
        "/api/guard/delete/" + id,
        {
            method: "DELETE"
        }
    )

        .then(response => {

            return response.text()
                .then(data => {

                    return {

                        ok: response.ok,

                        status:
                        response.status,

                        data: data

                    };

                });

        })

        .then(result => {

            if (!result.ok) {

                alert(
                    result.data ||
                    "Failed to delete guard"
                );

                return;
            }


            const message =
                document.getElementById("message");


            if (message) {

                message.innerText =
                    "Security guard deleted successfully";

            }


            loadGuards();

        })

        .catch(error => {

            console.error(
                "Delete Guard Error:",
                error
            );


            alert(
                "Unable to connect to server"
            );

        });

}


// ======================================================
// PAGE INITIALIZATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // -----------------------------
        // Dashboard
        // -----------------------------

        if (
            document.getElementById(
                "residentCount"
            )
        ) {

            loadDashboard();

        }


        // -----------------------------
        // Residents
        // -----------------------------

        if (
            document.getElementById(
                "residentTable"
            )
        ) {

            loadResidents();

            setupResidentForm();

        }


        // -----------------------------
        // Visitors
        // -----------------------------

        if (
            document.getElementById(
                "visitorTable"
            )
        ) {

            loadVisitors();

            setupVisitorForm();

        }


        // -----------------------------
        // Gate
        // -----------------------------

        if (
            document.getElementById(
                "gateForm"
            )
        ) {

            setupGateForm();

        }


        // -----------------------------
        // Entry
        // -----------------------------

        if (
            document.getElementById(
                "entryTable"
            )
        ) {

            loadEntries();

        }


        // -----------------------------
        // Exit
        // -----------------------------

        if (
            document.getElementById(
                "exitForm"
            )
        ) {

            setupExitForm();

        }


        // -----------------------------
        // Guards
        // -----------------------------

        if (
            document.getElementById(
                "guardTable"
            )
        ) {

            loadGuards();

        }


        if (
            document.getElementById(
                "guardForm"
            )
        ) {

            setupGuardForm();

        }

    }
);