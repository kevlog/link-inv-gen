function handleSeparatorChange() {
    const sep = document.getElementById("separator").value;
    const customInput = document.getElementById("customSeparator");
    customInput.classList.toggle("hidden", sep !== "custom");
}

function toggleInputMethod() {
    const mode = document.getElementById("inputMode").value;
    const manual = document.getElementById("manualInput");
    const file = document.getElementById("fileInput");

    if (mode === "manual") {
        manual.classList.remove("hidden");
        file.classList.add("hidden");
    } else {
        manual.classList.add("hidden");
        file.classList.remove("hidden");
    }

    // Bersihkan input agar tidak tertukar saat ganti mode
    document.getElementById("guestName").value = "";
    document.getElementById("guestFile").value = null;
}

function generateLink() {
    const output = document.getElementById("output");
    const downloadLink = document.getElementById("downloadLink");
    output.innerHTML = "";
    downloadLink.classList.add("hidden");

    let base = document.getElementById("basicUrl").value.trim();
    const separator = document.getElementById("separator").value;
    const customSep = document
        .getElementById("customSeparator")
        .value.trim();
    const name = document.getElementById("guestName").value.trim();
    const file = document.getElementById("guestFile").files[0];

    // Validasi jika mode file dan file bukan .txt
    const mode = document.getElementById("inputMode").value;
    if (mode === "file" && file) {
        const isTxt = file.name.toLowerCase().endsWith(".txt");
        if (!isTxt) {
        output.innerHTML =
            "<b class='text-red-400'>Hanya file .txt yang diperbolehkan!</b>";
        return;
        }
    }

    // Mengantur nilai dari parameter
    const sep = separator === "custom" ? "/?" + customSep + "=" : separator;

    // Mengatur agar input link undangan diawali https://
    if (!/^https?:\/\//i.test(base)) {
        base = "https://" + base;
    }

    // Validasi input link undangan
    if (!base || base === "https://") {
        output.innerHTML = "<b class='text-pink-400'>Link undangannya diisi dulu ya ^_^</b>";
        return;
    }
    
    // Validasi input parameter
    if (!sep || sep === "/?=") {
        output.innerHTML = "<b class='text-pink-400'>Parameternya lupa diisi deh kayaknya ^_^</b>";
        return;
    }

    // Jika pakai file upload
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
        const lines = e.target.result
            .split(/\r?\n/)
            .filter((l) => l.trim() !== "");
        const links = lines.map(
            (n) => `${base}${sep}${encodeURIComponent(n.trim())}`
        );
        output.innerHTML = `
        <p class="mb-2 font-semibold text-pink-300">Total ${
            links.length
        } link berhasil dibuat:</p>
        <ul class="list-disc pl-6">${links
            .slice(0, 5)
            .map(
            (l) =>
                `<li><a href="${l}" target="_blank" class="underline text-blue-300">${l}</a></li>`
            )
            .join("")}</ul>
        ${
            links.length > 5
            ? '<p class="text-sm text-gray-400 mt-2">...dan lainnya.</p>'
            : ""
        }
        `;

        // Buat file download
        const blob = new Blob([links.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.classList.remove("hidden");
        };
        reader.readAsText(file);
    }

    // Jika pakai input nama manual
    else if (name) {
        const finalUrl = `${base}${sep}${encodeURIComponent(name)}`;
        output.innerHTML = `
        <p class="mb-1 font-medium text-pink-300">Link Undangan berhasil dibuat:</p>
        <a href="${finalUrl}" target="_blank" class="underline text-blue-300">${finalUrl}</a>
    `;
    } else {
        output.innerHTML =
        "<b class='text-pink-400'>Masukkan nama tamu atau unggah file .txt yaa ^_^</b>";
    }
}