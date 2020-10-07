# Copyright (c) Istituto Nazionale di Fisica Nucleare (INFN). 2019-2020
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from app import app

toscaDir = app.config['TOSCA_TEMPLATES_DIR'] + "/"
toscaParamsDir = app.config.get('TOSCA_PARAMETERS_DIR')
orchestratorUrl = app.config['ORCHESTRATOR_URL']

iamUrl = app.config['IAM_BASE_URL']


tempSlamUrl = app.config.get('SLAM_URL') if app.config.get('SLAM_URL') else "" 

orchestratorConf = {
  'cmdb_url': app.config.get('CMDB_URL'),
  'slam_url': tempSlamUrl + "/rest/slam",
  'im_url': app.config.get('IM_URL'),
  'vault_url': app.config.get('VAULT_URL'),
  'monitoring_url': app.config.get('MONITORING_URL')
}

external_links = app.config.get('EXTERNAL_LINKS') if app.config.get('EXTERNAL_LINKS') else []

enable_advanced_menu = app.config.get('ENABLE_ADVANCED_MENU') if app.config.get('ENABLE_ADVANCED_MENU') else "no"

iamGroups = app.config.get('IAM_GROUP_MEMBERSHIP')

vault_role = app.config.get('VAULT_ROLE')
vault_audience = app.config.get('VAULT_OIDC_AUDIENCE')
