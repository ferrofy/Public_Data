document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtns = document.querySelectorAll('.Company_Box');
    const popups = document.querySelectorAll('.Open_Box');
    const closeBtns = document.querySelectorAll('.Close_Btn');
    const investmentPool = { VPX: 0, Tanav: 0, KMX: 0, AKX: 0, Angel: 0, UCI: 0, SSX: 0, PPX: 0 };
    const investmentFarm = { VPX: 460, Tanav: 460, KMX: 0, AKX: 80, Angel: 70, UCI: 0, SSX: 0, PPX: 500 };
    const shareRatePool = 0.2;
    const totalNeedPool = 4500;
    const totalNeedFarm = 2100;

    const calculateFillPercentage = (currentInvestments, totalNeeded) => {
        let totalCurrent = Object.values(currentInvestments).reduce((a, b) => a + b, 0);
        return (totalCurrent / totalNeeded) * 100;
    };

    const calculateSharesPool = (investments, shareRate) => {
        const shares = {};
        for (let investor in investments) {
            shares[investor] = investments[investor] * shareRate / 10;
        }
        return shares;
    };

    const calculateSharesFarm = (investments, totalNeeded) => {
        const shares = {};
        for (let investor in investments) {
            shares[investor] = investments[investor] * 100 / totalNeeded;
        }
        return shares;
    };

    const updateLoadingBars = () => {
        const poolFillPercentage = calculateFillPercentage(investmentPool, totalNeedPool);
        const farmFillPercentage = calculateFillPercentage(investmentFarm, totalNeedFarm);
        document.getElementById('Loading_Bar_Pool').style.width = `${poolFillPercentage}%`;
        document.getElementById('Loading_Bar_Farm').style.width = `${farmFillPercentage}%`;
        document.getElementById('Loading_Bar_Pool_Btn').style.width = `${poolFillPercentage}%`;
        document.getElementById('Loading_Bar_Farm_Btn').style.width = `${farmFillPercentage}%`;
        document.getElementById('Loading_Bar_Pool').innerText = `${Math.round(poolFillPercentage)}%`;
        document.getElementById('Loading_Bar_Farm').innerText = `${Math.round(farmFillPercentage)}%`;
    };

    const updateSharesInfo = () => {
        const poolShares = calculateSharesPool(investmentPool, shareRatePool);
        const farmShares = calculateSharesFarm(investmentFarm, totalNeedFarm);
        const poolSharesText = Object.entries(poolShares).map(([investor, shares]) => `${investor} = ${shares.toFixed(2)}%`).join('<br>');
        const farmSharesText = Object.entries(farmShares).map(([investor, shares]) => `${investor} = ${shares.toFixed(2)}%`).join('<br>');

        document.querySelector('#Pool .Shares_Details').innerHTML = `<b>Shares</b><br>${poolSharesText}`;
        document.querySelector('#Farm .Shares_Details').innerHTML = `<b>Shares</b><br>${farmSharesText}`;
        document.querySelector('#Pool .Investments_Details').innerHTML = `<b>Investments</b><br>${Object.entries(investmentPool).map(([investor, amount]) => `${investor} = ₹${amount}`).join('<br>')}`;
        document.querySelector('#Farm .Investments_Details').innerHTML = `<b>Investments</b><br>${Object.entries(investmentFarm).map(([investor, amount]) => `${investor} = ₹${amount}`).join('<br>')}`;
        document.querySelector('#Pool .Share_Rates').innerHTML = `<b>Share Rate:</b> Pool = ₹${shareRatePool} Per 10`;
    };

    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const popupId = btn.getAttribute('data-popup');
            document.getElementById(popupId).style.display = 'flex';
            const details = document.querySelector(`#${popupId} .Investments_Details`);
            details.style.display = 'block';
            const shareDetails = document.querySelector(`#${popupId} .Shares_Details`);
            shareDetails.style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.Open_Box').style.display = 'none';
            const details = btn.closest('.Open_Box').querySelector('.Investments_Details');
            details.style.display = 'none';
            const shareDetails = btn.closest('.Open_Box').querySelector('.Shares_Details');
            shareDetails.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        popups.forEach(popup => {
            if (e.target === popup) {
                popup.style.display = 'none';
                const details = popup.querySelector('.Investments_Details');
                details.style.display = 'none';
                const shareDetails = popup.querySelector('.Shares_Details');
                shareDetails.style.display = 'none';
            }
        });
    });

    updateLoadingBars();
    updateSharesInfo();
});
