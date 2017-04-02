import express from 'express';
import request from 'request';
import url from 'url';
import settings from '../../config/settings';
import dateFormat from 'dateformat';

const router = express.Router();

router.get('/pullrequests/:instanceKey', (req, res, next) => {
    if (req.params.instanceKey) {
        let found = false;
        let instance;
        for (let i = 0; i < settings.instances.length; i++) {
            instance = settings.instances[i];
            if(instance.key === req.params.instanceKey) {
                found = true;
                break;
            }
        }
        if(!found) {
            return res.send(404, 'The specified instance does not exist.');
        }
        
        request({
            url: url.resolve(instance.url, '/defaultcollection/_apis/git/pullRequests?api-version=3.0&status=active'),
            headers: {            
                'Authorization': 'Basic ' + new Buffer(':' + instance.pat).toString('base64')
            }
        }, (err, response, body) => {
            if (err) {
                return res.send(500, 'The request failed due to an internal error: ' + err);
            } else {
                switch(response.statusCode) {
                    case 200:
                        return res.send(200, formatData(instance, JSON.parse(body)));
                        break;
                    case 401:
                        return res.send(401, 'You do no have authorization to access the requested URL.');
                        break;
                    case 403:
                        return res.send(403, 'The PAT in use does not allow access to Pull Requests. Please create a new one with the relevant permissions.');
                        break;
                    case 404:
                        return res.send(404, 'The requested URL is not valid.');
                        break;
                    default:
                        res.send(500, 'The request failed due to an internal error.');
                        break;
                }
            }
        });
    } else {
        return res.send(400, 'The request does not contain an instance key');
    }
});

function formatData(instance, data) {
    let formattedData = [];
        
    for(let i = 0; i < data.value.length; i++) {
        const pr = data.value[i];
        const formattedPr = {
            number: pr.pullRequestId,
            repo: pr.repository.name,
            project: pr.repository.project.name,
            created: dateFormat(pr.creationDate, 'dd/mm/yy HH:MM:ss'),
            creator: pr.createdBy.displayName,
            title: pr.title,
            url: url.resolve(instance.url, encodeURIComponent(pr.repository.project.name)
                            + '/_git/'
                            + encodeURIComponent(pr.repository.name)
                            + '/pullrequest/'
                            + pr.pullRequestId)
        };
        formattedData.push(formattedPr);
    }
    return formattedData;
}

export default router;