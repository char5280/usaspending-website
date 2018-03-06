/**
 * BaseContract.js
 * Created by Kevin Li 2/22/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import BaseAwardRecipient from './BaseAwardRecipient';
import BaseAwardPlaceOfPerformance from './BaseAwardPlaceOfPerformance';
import BaseAwardAgency from './BaseAwardAgency';
import BaseContractAdditionalDetails from './BaseContractAdditionalDetails';
import CoreAward from './CoreAward';

const BaseContract = Object.create(CoreAward);

BaseContract.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.piid,
        internalId: data.id,
        category: data.category,
        startDate: data.period_of_performance_start_date,
        endDate: data.period_of_performance_current_end_date
    };
    this.populateCore(coreData);

    const recipient = Object.create(BaseAwardRecipient);
    recipient.populate(data.recipient);
    this.recipient = recipient;

    const placeOfPerformance = Object.create(BaseAwardPlaceOfPerformance);
    placeOfPerformance.populate(data.place_of_performance);
    this.placeOfPerformance = placeOfPerformance;

    if(data.awarding_agency) {
        const awardingAgency = Object.create(BaseAwardAgency);
        awardingAgency.populate(data.awarding_agency);
        this.awardingAgency = awardingAgency;
    }

    if(data.funding_agency) {
        const fundingAgency = Object.create(BaseAwardAgency);
        fundingAgency.populate(data.funding_agency);
        this.fundingAgency = fundingAgency;
    }

    const additionalDetails = Object.create(BaseContractAdditionalDetails);
    additionalDetails.populate(data.latest_transaction.contract_data);
    this.additionalDetails = additionalDetails;

    // populate the contract-specific fields
    this.parentAward = data.parent_award_piid;
    this.description = data.description || '';
    this._amount = parseFloat(data.base_and_all_options_value) || 0;
    this._ceiling = parseFloat(data.base_and_all_options_value) || 0;
    this._obligation = parseFloat(data.total_obligation) || 0;
};


// getter functions
Object.defineProperty(BaseContract, 'amount', {
    get() {
        return formatMoney(this._amount);
    }
});
Object.defineProperty(BaseContract, 'ceiling', {
    get() {
        return formatMoney(this._ceiling);
    }
});
Object.defineProperty(BaseContract, 'obligation', {
    get() {
        return formatMoney(this._obligation);
    }
});

export default BaseContract;
