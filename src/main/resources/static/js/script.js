// ==========================================
// VisitorPass - Main JavaScript
// ==========================================


// ==========================================
// DASHBOARD
// ==========================================

function loadDashboard() {

    fetch("/api/resident/getall")
        .then(response => {
            if (!response.ok) {
                throw new Error("Resident API failed");
            }
            return response.json();
        })
        .then(data => {
            const element = document.getElementById("residentCount");

            if (element) {
                element.innerText = data.length;
            }
        })
        .catch(error => {
            console.error("Resident API Error:", error);
        });


    fetch("/api/visitor/getall")
        .then(response => {
            if (!response.ok) {
                throw new Error("Visitor API failed");
            }
            return response.json();
        })
        .then(data => {
            const element = document.getElementById("visitorCount");

            if (element) {
                element.innerText = data.length;
            }
        })
        .catch(error => {
            console.error("Visitor API Error:", error);
        });


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

            const inElement =
                document.getElementById("inCount");

            const outElement =
                document.getElementById("outCount");


            if (entryElement) {
                entryElement.innerText = data.length;
            }


            if (inElement) {

                const inCount = data.filter(entry =>
                    String(entry.status || "").toUpperCase() === "IN"
                ).length;

                inElement.innerText = inCount;
            }


            if (outElement) {

                const outCount = data.filter(entry =>
                    String(entry.status || "").toUpperCase() === "OUT"
                ).length;

                outElement.innerText = outCount;
            }

        })
        .catch(error => {
            console.error("Entry API Error:", error);
        });


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
            console.error("Guard API Error:", error);
        });
}


// ==========================================
// RESIDENT
// ==========================================

function loadResidents() {

    fetch("/api/resident/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Resident API failed");
            }

            return response.json();

        })

        .then(data => {

            const table =
                document.getElementById("residentTable");

            if (!table) {
                return;
            }

            table.innerHTML = "";

            data.forEach(resident => {

                const id =
                    resident.Id ?? resident.id ?? "";

                const name =
                    resident.Name ?? resident.name ?? "";

                const phone =
                    resident.Phone ?? resident.phone ?? "";

                const email =
                    resident.Email ?? resident.email ?? "";

                const address =
                    resident.Address ?? resident.address ?? "";

                const flatId =
                    resident.FlatId ?? resident.flatId ?? "";


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
                "Load Resident Error:",
                error
            );

            alert("Unable to load residents");

        });
}


function setupResidentForm() {

    const form =
        document.getElementById("residentForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const flatId =
            Number(document.getElementById("flatId").value);


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


        fetch("/api/resident/create", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(resident)

        })

            .then(response => {

                return response.text().then(data => ({

                    ok: response.ok,
                    status: response.status,
                    data: data

                }));

            })

            .then(result => {

                if (!result.ok) {

                    console.error(
                        "Resident API Error:",
                        result.status,
                        result.data
                    );

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


                // SUCCESS - NO ALERT

                if (message) {
                    message.innerText =
                        "Resident added successfully";
                }


                form.reset();


                loadResidents();

            })

            .catch(error => {

                console.error(
                    "Resident Connection Error:",
                    error
                );

                alert("Unable to connect to server");

                if (message) {
                    message.innerText =
                        "Failed to add resident";
                }

            });

    });

}


// ==========================================
// VISITOR
// ==========================================

function loadVisitors() {

    fetch("/api/visitor/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Visitor API failed");
            }

            return response.json();

        })

        .then(data => {

            const table =
                document.getElementById("visitorTable");

            if (!table) {
                return;
            }

            table.innerHTML = "";


            data.forEach(visitor => {

                const id =
                    visitor.Id ?? visitor.id ?? "";

                const name =
                    visitor.Name ?? visitor.name ?? "";

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
                "Load Visitor Error:",
                error
            );

            alert("Unable to load visitors");

        });
}


function setupVisitorForm() {

    const form =
        document.getElementById("visitorForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const visitDate =
            document.getElementById("visitDate").value;

        const fromTime =
            document.getElementById("fromTime").value;

        const toTime =
            document.getElementById("toTime").value;

        const flatId =
            Number(
                document.getElementById("flatId").value
            );


        const message =
            document.getElementById("message");


        if (!/^[0-9]{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10 digit phone number"
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


        fetch("/api/visitor/create", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(visitor)

        })

            .then(response => {

                return response.text().then(data => ({

                    ok: response.ok,
                    status: response.status,
                    data: data

                }));

            })

            .then(result => {

                if (!result.ok) {

                    console.error(
                        "Visitor API Error:",
                        result.status,
                        result.data
                    );

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


                // SUCCESS - NO ALERT

                if (message) {
                    message.innerText =
                        "Visitor added successfully";
                }


                form.reset();


                loadVisitors();

            })

            .catch(error => {

                console.error(
                    "Visitor Connection Error:",
                    error
                );

                alert("Unable to connect to server");

                if (message) {
                    message.innerText =
                        "Failed to add visitor";
                }

            });

    });

}


// ==========================================
// GATE VERIFICATION
// ==========================================

function setupGateForm() {

    const form =
        document.getElementById("gateForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const phone =
            document.getElementById("phone").value.trim();

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

                return response.text().then(data => ({

                    ok: response.ok,
                    status: response.status,
                    data: data

                }));

            })

            .then(result => {

                if (!result.ok) {

                    console.error(
                        "Gate API Error:",
                        result.status,
                        result.data
                    );

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


                // SUCCESS - NO ALERT

                if (message) {
                    message.innerText =
                        result.data ||
                        "Visitor verified successfully";
                }

            })

            .catch(error => {

                console.error(
                    "Gate Connection Error:",
                    error
                );

                alert("Unable to connect to server");

                if (message) {
                    message.innerText =
                        "Verification failed";
                }

            });

    });

}


// ==========================================
// ENTRY / EXIT
// ==========================================

function loadEntries() {

    fetch("/api/entry/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Entry API failed");
            }

            return response.json();

        })

        .then(data => {

            const table =
                document.getElementById("entryTable");

            if (!table) {
                return;
            }

            table.innerHTML = "";


            data.forEach(entry => {

                const id =
                    entry.Id ?? entry.id ?? "";

                const phone =
                    entry.phone ?? "";

                const entryTime =
                    entry.entryTime ?? "";

                const exitTime =
                    entry.exitTime ?? "-";

                const status =
                    entry.status ?? "";


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
                "Load Entry Error:",
                error
            );

            alert("Unable to load entry records");

        });
}


function setupExitForm() {

    const form =
        document.getElementById("exitForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const phone =
            document.getElementById("phone").value.trim();

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

                return response.text().then(data => ({

                    ok: response.ok,
                    status: response.status,
                    data: data

                }));

            })

            .then(result => {

                if (!result.ok) {

                    console.error(
                        "Exit API Error:",
                        result.status,
                        result.data
                    );

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


                // SUCCESS - NO ALERT

                if (message) {
                    message.innerText =
                        result.data ||
                        "Visitor exit recorded successfully";
                }


                document.getElementById("phone").value = "";


                loadEntries();

            })

            .catch(error => {

                console.error(
                    "Exit Connection Error:",
                    error
                );

                alert("Unable to connect to server");

                if (message) {
                    message.innerText =
                        "Exit failed";
                }

            });

    });

}


// ==========================================
// SECURITY GUARDS
// ==========================================

function loadGuards() {

    fetch("/api/guard/getall")

        .then(response => {

            if (!response.ok) {
                throw new Error("Guard API failed");
            }

            return response.json();

        })

        .then(data => {

            const table =
                document.getElementById("guardTable");

            if (!table) {
                return;
            }

            table.innerHTML = "";


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
                            onclick="deleteGuard(${id})">
                            Delete
                        </button>
                    </td>
                `;


                table.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Load Guard Error:",
                error
            );

            alert("Unable to load security guards");

        });
}


function setupGuardForm() {

    const form =
        document.getElementById("guardForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const shift =
            document.getElementById("shift").value.trim();


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


        fetch("/api/guard/create", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(guard)

        })

            .then(response => {

                return response.text().then(data => ({

                    ok: response.ok,
                    status: response.status,
                    data: data

                }));

            })

            .then(result => {

                if (!result.ok) {

                    console.error(
                        "Guard API Error:",
                        result.status,
                        result.data
                    );

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


                // ==================================
                // SUCCESS
                // NO ALERT HERE
                // ==================================

                if (message) {
                    message.innerText =
                        "Security guard added successfully";
                }


                form.reset();


                loadGuards();

            })

            .catch(error => {

                console.error(
                    "Guard Connection Error:",
                    error
                );

                alert("Unable to connect to server");

                if (message) {
                    message.innerText =
                        "Failed to add security guard";
                }

            });

    });

}


// ==========================================
// DELETE GUARD
// ==========================================

function deleteGuard(id) {

    fetch("/api/guard/delete/" + id, {

        method: "DELETE"

    })

        .then(response => {

            return response.text().then(data => ({

                ok: response.ok,
                status: response.status,
                data: data

            }));

        })

        .then(result => {

            if (!result.ok) {

                console.error(
                    "Delete Guard Error:",
                    result.status,
                    result.data
                );

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
                "Delete Guard Connection Error:",
                error
            );

            alert("Unable to connect to server");

        });

}


// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function() {


    // Dashboard

    if (document.getElementById("residentCount")) {
        loadDashboard();
    }


    // Residents

    if (document.getElementById("residentTable")) {

        loadResidents();

        setupResidentForm();

    }


    // Visitors

    if (document.getElementById("visitorTable")) {

        loadVisitors();

        setupVisitorForm();

    }


    // Gate

    if (document.getElementById("gateForm")) {

        setupGateForm();

    }


    // Entry / Exit

    if (document.getElementById("entryTable")) {

        loadEntries();

    }


    if (document.getElementById("exitForm")) {

        setupExitForm();

    }


    // Guards

    if (document.getElementById("guardTable")) {

        loadGuards();

    }


    if (document.getElementById("guardForm")) {

        setupGuardForm();

    }

});