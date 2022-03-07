package priv.yp.town.bigdata.controller;

import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import priv.yp.town.bigdata.util.DataCache;

@RestController
@RequestMapping("/data")
@CrossOrigin
public class DataController {

    @GetMapping("/personTotal")
    public JSONObject personTotal(@RequestParam("year") int year) {
        return DataCache.personTotalDataMap.get(year);
    }

    @GetMapping("/personAdded")
    public JSONObject personAdded(@RequestParam("year") int year) {
        return DataCache.personAddedDataMap.get(year);
    }

    @GetMapping("/personLeaved")
    public JSONObject personLeaved(@RequestParam("year") int year) {
        return DataCache.personLeavedDataMap.get(year);
    }

    @GetMapping("/enterpriseTotal")
    public JSONObject enterpriseTotal(@RequestParam("year") int year) {
        return DataCache.enterpriseTotalDataMap.get(year);
    }

    @GetMapping("/enterpriseInnovate")
    public JSONObject enterpriseInnovate(@RequestParam("year") int year) {
        return DataCache.enterpriseInnovateDataMap.get(year);
    }

    @GetMapping("/enterpriseDistribution")
    public JSONObject enterpriseDistribution(@RequestParam("year") int year) {
        return DataCache.enterpriseDistributionDataMap.get(year);
    }

    @GetMapping("/enterpriseDevelop")
    public JSONObject enterpriseDevelop(@RequestParam("year") int year) {
        return DataCache.enterpriseDevelopDataMap.get(year);
    }

    @GetMapping("/projectApply")
    public JSONObject projectApply(@RequestParam("year") int year) {
        return DataCache.projectApplyDataMap.get(year);
    }

    @GetMapping("/projectSupport")
    public JSONObject projectSupport(@RequestParam("year") int year) {
        return DataCache.projectSupportDataMap.get(year);
    }

    @GetMapping("/projectCost")
    public JSONObject projectCost(@RequestParam("year") int year) {
        return DataCache.projectCostDataMap.get(year);
    }

    @GetMapping("/projectClosed")
    public JSONObject projectClosed(@RequestParam("year") int year) {
        return DataCache.projectClosedDataMap.get(year);
    }
}
