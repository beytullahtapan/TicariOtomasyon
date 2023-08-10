function Getid() {
    var aracId = $("#Aracid").val();
    $.ajax({
        url: "/Seferler/Getcariid",
        type: "POST",
        dataType: "json",
        data: { aracId: aracId },
        success: function (result) {
            var cariid = result;

            // Şoför Seçimi alanındaki tüm seçeneklerin değerini sıfırla
            $("#soforSelect option").prop("selected", false);

            // Seçilen Şoför ID'sine sahip seçeneği seçili hale getir
            $("#soforSelect option[value='" + cariid + "']").prop("selected", true);
        }
    });
}

function Getarac() { 
    var aracId = $("#Aracid").val();
    $.ajax({
        url: "/Seferler/Getarac",
        type: "POST",
        dataType: "json",
        data: { aracId: aracId },
        success: function (result) {
            var aracgrup = result;
            // Aracın grup bilgisine göre aracaödenentutar alanını etkinleştir veya devre dışı bırak
            if (aracgrup === 1) {
                $("#Aracaödenentutar").prop("disabled", true);
                $("#Aracaödenentutar").attr("placeholder", "Şirket Aracı olduğu için devredışı bırakıldı.");
            } else if (aracgrup === 2) {
                $("#Aracaödenentutar").prop("disabled", false);
                $("#Aracaödenentutar").prop("required", true);
                $("#Aracaödenentutar").attr("placeholder", "");
            } 
        }
    });
}

//Yakıt ekleme
function getKm() {
    var aracId = $("#Aracid").val();
    $.ajax({
        url: "/Yakıt/GetKm",
        type: "POST",
        dataType: "json",
        data: { aracId: aracId },
        success: function (result) {
            $("input[name='İlkkm']").val(result);
        }
    });
}

//Yakıt ekleme ajax sonu.




//Document ready Baslangıc
$(document).ready(function () {
    // tonaj ve birim fiyat değiştiğinde navlun bedelini ve nakliye fiyatını hesapla
    $("#Tonaj, #Birimfiyat").on("input", function () {
        var tonaj = parseFloat($.trim($("#Tonaj").val()));
        var birimFiyat = parseFloat($.trim($("#Birimfiyat").val()));


        if (!isNaN(tonaj) && !isNaN(birimFiyat)) {
            var nakliyeFiyat = tonaj * birimFiyat;
            $("#Nakliyefiyat").val(nakliyeFiyat.toFixed(2));
            $("#NavlunBedel").val(nakliyeFiyat.toFixed(2));
        }
    });
    $("#Aracaödenentutar").change(function () {
        var aracod = $("#Aracaödenentutar").val();
        var Navluntutar = $("#NavlunBedel").val();
        if(aracod > Navluntutar) {
            Swal.fire({
                title: 'Dikkat!',
                text: 'Araca Ödenen Tutar Navlun Tutarından Büyük Zarara Girebilirsiniz!',
                icon: 'info',
                confirmButtonText: 'Tamam'
            });
        }
    });
    $("#Aracid").change(function () {
        Getid();
        Getarac();
        getKm();
    });
    $("#Nakliyefiyat").on("input", function () {
        Getarac(); 
    });
    $("#Nakliyefiyat").keyup(function () {
        var nakliyefiyat = $(this).val();
        $("#NavlunBedel").val(nakliyefiyat);
    });
    // Tck vnk kontrol
    $('#CariTckVKN').on('input', function () {
        var cariTckVkn = $(this).val();
        $.ajax({
            url: '/Cariler/CheckCariTckVkn',
            type: 'POST',
            data: { cariTckVkn: cariTckVkn },
            success: function (response) {
                if (response.exists) {
                    $('#errorDiv').text('Bu TCKN veya VKN zaten kayıtlı!');
                    $('#errorDiv').show();
                } else {
                    $('#errorDiv').empty();
                    $('#errorDiv').hide();
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
    // Tck vnk kontrol sonu

    // Seferler filtreleme
    $("#filterguzergah").change(function () {
        var selectedGuzergah = $(this).val();

        if (selectedGuzergah === "all") {
            // Tüm seferleri göster
            $(".sefer-item").show();
        } else {
            // Seçilen güzergaha sahip seferleri göster, diğerlerini gizle
            $(".sefer-item").hide();
            $(".sefer-item[data-guzergah='" + selectedGuzergah + "']").show();
        }
    });
    $('#filterFaturaDurumu').on('change', function () {
        var selectedValue = $(this).val();
        filterSeferler(selectedValue, 'Fatura');
    });

    $('#filterFaturaDurumu2').on('change', function () {
        var selectedValue2 = $(this).val();
        filterSeferler(selectedValue2, 'Teslim');
    });

    function filterSeferler(selectedValue, type) {
        if (selectedValue === "all") {
            $('.sefer-item').show();
        } else if (selectedValue === "kesildi" && type === 'Fatura') {
            $('.sefer-item.kesilmedi').hide();
            $('.sefer-item.kesildi').show();
        } else if (selectedValue === "kesilmedi" && type === 'Fatura') {
            $('.sefer-item.kesildi').hide();
            $('.sefer-item.kesilmedi').show();
        } else if (selectedValue === "geldi" && type === 'Teslim') {
            $('.sefer-item.gelmedi').hide();
            $('.sefer-item.geldi').show();
        } else if (selectedValue === "gelmedi" && type === 'Teslim') {
            $('.sefer-item.geldi').hide();
            $('.sefer-item.gelmedi').show();
        }
    }

    // arac grubu filtreleme
    $('#filterAracGrup').on('change', function () {
        var selectedValue = $(this).val();
        filterAraclar(selectedValue);
    });
    $("#filteraractip").change(function () {
        var selectedGuzergah = $(this).val();

        if (selectedGuzergah === "all") {
            // Tüm seferleri göster
            $(".arac-item").show();
        } else {
            // Seçilen güzergaha sahip seferleri göster, diğerlerini gizle
            $(".arac-item").hide();
            $(".arac-item[data-tipi='" + selectedGuzergah + "']").show();
        }
    });
    function filterAraclar(selectedValue) {
        if (selectedValue === "all") {
            $('tbody tr').show();
        } else if (selectedValue === "sirket") {
            $('tbody tr').hide();
            $('tbody tr:contains("Şirket")').show();
        } else if (selectedValue === "kiralik") {
            $('tbody tr').hide();
            $('tbody tr:contains("Kiralık")').show();
        }
    }
    // cari grubu filterleme
        $('#filterCariGrup').on('change', function () {
        var selectedValue = $(this).val();
        Filtercari(selectedValue);
    });

        function Filtercari(selectedValue) {
        if (selectedValue === "all") {
            $('tbody tr').show();
        } else if (selectedValue === "musteri") {
            $('tbody tr').hide();
        $('tbody tr:contains("Müşteri")').show();
        } else if (selectedValue === "sofor") {
            $('tbody tr').hide();
        $('tbody tr:contains("Şofor")').show();
        }
        else if (selectedValue === "benzinlik") {
            $('tbody tr').hide();
        $('tbody tr:contains("Benzinlik")').show();
        }
        else if (selectedValue === "nakliyeci") {
            $('tbody tr').hide();
        $('tbody tr:contains("Nakliyeci")').show();
        }
    }

   // yakıt ekleme js ready
    $("#btnDepodanYakitAlim").click(function () {
        // "Depodan Yakıt Alımı" divini göster, "Yakıt Alımı" divini gizle
        $("#divDepodanYakitAlim").show();
        $("#divYakitAlim").hide();

        $(this).addClass("selected-button");
        $("#btnYakitAlim").removeClass("selected-button");
    });
    function Getsofor() {
        var aracId = $("#Aracid").val();
        $.ajax({
            url: "/Yakıt/Getsofor",
            type: "POST",
            dataType: "json",
            data: { aracId: aracId },
            success: function (result) {
                var cariid = result;

                // Şoför Seçimi alanındaki tüm seçeneklerin değerini sıfırla
                $("#sofor option").prop("selected", false);

                // Seçilen Şoför ID'sine sahip seçeneği seçili hale getir
                $("#sofor option[value='" + cariid + "']").prop("selected", true);
            }
        });
    }

    $("#Aracid").change(function () {
        Getsofor();
    });
    // yakıt ekleme js sonu
        $("#Aracid").select2({
            width: '100%', // Seçim kutusunun tam genişlikte başlamasını sağlar
            dropdownAutoWidth: true, // Seçim kutusu açıldığında genişliğini otomatik olarak ayarlar
            value: 0,
            placeholder: "Seçiniz",
        });
        $("#Cariid").select2({
            width: '100%', // Seçim kutusunun tam genişlikte başlamasını sağlar
            dropdownAutoWidth: true, // Seçim kutusu açıldığında genişliğini otomatik olarak ayarlar
            value: 0,
            placeholder: "Seçiniz",
        });
        $("#Soforid").select2({
            width: '100%', // Seçim kutusunun tam genişlikte başlamasını sağlar
            dropdownAutoWidth: true, // Seçim kutusu açıldığında genişliğini otomatik olarak ayarlar
            value: 0,
            placeholder: "Seçiniz",
        });


        // SEFERLER

            // Tabloyu başlangıç ve bitiş tarihine göre filtrele
            function filterTableByDate(startDate, endDate) {
                $('#responsive-datatable tbody tr').each(function () {
                    var dateStr = $(this).data('tarih'); // Satırın tarih değerini alıyoruz
                    var tarih = parseServerDate(dateStr);
                    var startDateTime = new Date(startDate);
                    var endDateTime = new Date(endDate);

                    // Saat ve dakika bilgilerini sıfırlıyoruz
                    tarih.setHours(0, 0, 0, 0);
                    startDateTime.setHours(0, 0, 0, 0);
                    endDateTime.setHours(0, 0, 0, 0);

                    if (tarih.getTime() >= startDateTime.getTime() && tarih.getTime() <= endDateTime.getTime()) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }

        // Function to parse the server-side date format ("dd.MM.yyyy HH:mm:ss") into a Date object
        function parseServerDate(dateStr) {
            var parts = dateStr.split(' ');
        var dateParts = parts[0].split('.');
        var timeParts = parts[1].split(':');
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
        }




        // Başlangıç ve bitiş tarih input elemanlarını seç
        var startDateInput = $('#filterBaslangicTarih');
        var endDateInput = $('#endDate');

        // Başlangıç ve bitiş tarih inputlarındaki değerler değiştiğinde tabloyu filtrele
        startDateInput.on('change', function () {
            var startDate = $(this).val();
        var endDate = endDateInput.val();
        filterTableByDate(startDate, endDate);
        });

        endDateInput.on('change', function () {
            var startDate = startDateInput.val();
        var endDate = $(this).val();
        filterTableByDate(startDate, endDate);
        });






});
// seferler filtreleme sonu
//Document ready sonu


