{{#if scope.travisCi}}
[![Build Status]({{scope.travisCi}}.svg?branch=master)]({{scope.travisCi}})
{{/if}}
{{#if scope.davidDm}}
[![Dependency Status]({{scope.davidDm}}.svg)]({{scope.davidDm}})
[![devDependency Status]({{scope.davidDm}}/dev-status.svg)]({{scope.davidDm}}#info=devDependencies)
{{/if}}

{{scope.desc}}
